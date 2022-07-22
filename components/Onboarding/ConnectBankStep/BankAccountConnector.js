import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import {
  setBankUserId,
  setVerifiableCredentials,
  setBankCredentials,
} from "../../../redux/user";
// import Input from '../../Input/Input';
import BaseContentLayout from "../../BaseContentLayout/BaseContentLayout";
import styles from "./BankAccountConnector.module.css";
import { createDidFormat, parseJwt } from "../../../utils/vcUtils";
import { useSession, signIn, signOut } from "next-auth/react";

const BankAccountConnector = ({ onNext, isLoading, setIsLoading }) => {
  const walletId = useSelector((state) => state.user.walletId);
  const chainId = useSelector((state) => state.user.chainId);
  const dispatch = useDispatch();

  const { data: session } = useSession();
  const username = session?.user;
  const accessToken = useMemo(() => session?.accessToken);

  const t = useTranslations("onboarding");

  const REQUEST_VERIFICATION = gql`
    mutation requestVC {
      requestVerification(did:"${createDidFormat(
        walletId,
        chainId
      )}", type:bankVCs, username:"${username}")
    }  
  `;

  const REQUEST_BANK_VC = gql`
    query bankVC(
      $did: String
      $message: String
      $type: VCTypeEnum
      $parameters: String
    ) {
      bankVC(did: $did, message: $message, parameters: $parameters, type: $type)
    }
  `;

  const [requestVerificationMutation, { verificationData, loading, error }] =
    useMutation(REQUEST_VERIFICATION);
  const [requestBankVC, { bankVCData, bankVCLoading, bankVCError }] =
    useLazyQuery(REQUEST_BANK_VC, {
      onCompleted: (data) => {
        console.log("onCompleted data", data);
      },
    });

  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);
      console.log("next-auth session => accessToken!!!", accessToken);
      requestVerificationMutation()
        .then((res) => {
          // Get the salt from the VC issuer
          let salt = res.data.requestVerification;
          console.log("Returned salt", salt);

          // Encrypt the Finastra access token with the salt from the VC issuer
          var CryptoJS = require("crypto-js");
          const salted = CryptoJS.AES.encrypt(accessToken, salt).toString();
          console.log("Encrypted salt", salted);
          console.log("DID", createDidFormat(walletId, chainId));

          requestBankVC({
            variables: {
              parameters: salted,
              did: createDidFormat(walletId, chainId),
              message: "test", // To be signed with DID (wallet)
              type: "bankVCs",
            },
          })
            .then((resVC) => {
              console.log("resVC", resVC);
              let vcJwtArray = resVC.data.bankVC;
              console.log("vcJwtArray", vcJwtArray);
              const vcArray = vcJwtArray.map((vcJwt) => parseJwt(vcJwt));
              console.log("vcArray", vcArray);
              dispatch(setBankUserId(username));
              dispatch(setVerifiableCredentials(vcJwtArray));
              dispatch(setBankCredentials(vcArray));
              // signOut();
              onNext();
            })
            .catch((err) => {
              console.error("ERROR2", err);
              dispatch(setBankUserId("ERROR2"));
              // signOut();
              return err;
            });
        })
        .catch((err) => {
          console.error("ERROR1", err);
          dispatch(setBankUserId("ERROR1"));
          // signOut();
          return err;
        });
    }
  }, [accessToken]);

  const [connectionError, setConnectionError] = useState(false);
  // const [user, setUser] = useState({
  //   username: '',
  //   password: '',
  //   connectionError: false
  // });

  // const updateInput = e => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value
  //   })
  // };

  const onContinue = () => {
    signIn("finastra");
  };

  // const onRetry = () => {
  //   setUser({
  //     ...user,
  //     connectionError: false
  //   })
  // }

  return (
    <BaseContentLayout
      {...{
        submitButtonProps: {
          label: t("submitBtn"), // connectionError ? t('page2.try_again') :
          onClick: onContinue, // connectionError ? onRetry :
          disabled: !!accessToken,
          style: null, // connectionError ? styles.customButton : null
        },
      }}
    >
      <div className={styles.wrapper}>
        <h1>{t("page2.title")}</h1>

        <h4>{t("page2.access_note")}</h4>

        <div className={styles.lockparagraph}>
          <h4>{t("page2.data_note")}</h4>
          <Image
            src="/lock.svg"
            className={styles.bar}
            height={160}
            width={80}
            alt="Security"
          />
        </div>

        {/* {session ?
          <div className={styles.grid}>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          : 
          <div>
            You are not signed in! 
            <button onClick={() => signIn('finastra')}>Sign in with Finastra</button>
          </div>
        }
        <div>Access Token: {accessToken}</div> */}

        {/* { user.connectionError ? 
          <div className={styles.errorconnecting}>
            <div className={styles.errorcircle} />
            {t('page2.connection_error')}
          </div>
          : 
          <div>
            <Input
              type="text"
              name="username"
              placeholder={t('page2.username')}
              onChange={updateInput} />

            <Input
              type='password'
              name='password'
              placeholder={t('page2.password')}
              onChange={updateInput}
            />
          </div>
        }*/}

        {session ? (
          <div className={styles.skip} onClick={() => signOut()}>
            Logout
          </div>
        ) : (
          <div className={styles.skip} onClick={() => onNext()}>
            {t("page2.skip")}
          </div>
        )}
      </div>
    </BaseContentLayout>
  );
};

export default BankAccountConnector;
