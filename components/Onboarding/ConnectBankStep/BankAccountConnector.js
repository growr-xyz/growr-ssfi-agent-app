import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useLazyQuery, gql } from '@apollo/client';
import { setBankUserId, setVerifiableCredential, setBankCredential } from '../../../redux/user';
import Input from '../../Input/Input';
import BaseContentLayout from '../../BaseContentLayout/BaseContentLayout';
import styles from "./BankAccountConnector.module.css";
import { parse } from '@ethersproject/transactions';
import { createDidFormat, parseJwt } from '../../../utils/vcUtils';

const BankAccountConnector = ({ onNext }) => {
  const walletId = useSelector((state) => state.user.walletId);
  const chainId = useSelector((state) => state.user.chainId);
  // const bankUserId = useSelector((state) => state.user.bankUserId);
  const dispatch = useDispatch();

  const t = useTranslations("onboarding");

  const [user, setUser] = useState({
    username: '',
    password: '',
    connectionError: false
  });

  const updateInput = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };

  // const CONNECT_BANK = gql`
  //   mutation connectBank {
  //     connectBank(, username:"${user.username}", password:"${user.password}", wallet:"${walletId}"){success}
  //   }
  // `
  // const [connectBankMutation, { data, loading, error }] = useMutation(CONNECT_BANK) //, {errorPolicy: 'all'})

  const REQUEST_VERIFICATION = gql`
    mutation requestVC {
      requestVerification(did:"${createDidFormat(walletId)}", type:citizenship, username:"${user.username}")
    }  
  `;

  const REQUEST_BANK_VC = gql`
    query bankVC($did: String, $message: String, $type: VCTypeEnum, $parameters: String) {
      bankVC(did:$did, message:$message, parameters: $parameters, type: $type)
    }
  `;

  const [requestVerificationMutation, { verificationData, loading, error }] = useMutation(REQUEST_VERIFICATION); //, {errorPolicy: 'all'})
  const [requestBankVC, { bankVCData, bankVCLoading, bankVCError }] = useLazyQuery(REQUEST_BANK_VC, {
    onCompleted: (data) => {
      console.log('onCompleted data', data);
    }    
  });

  const onContinue = () => {
    // dispatch(setBankUserId(user.username));
    // onNext();
    requestVerificationMutation()
      .then(res => {
        let salt = res.data.requestVerification;
        console.log('Returned salt', salt);

        var CryptoJS = require('crypto-js');
        const salted = CryptoJS.AES.encrypt(user.password, salt).toString();
        console.log('Encrypted salt', salted);
        console.log('DID', createDidFormat(walletId, chainId));

        // var jsonData = pm.response.json();
        // pm.environment.set('salt', jsonData.data.requestVerification)
        // TODO: Array of VCs
        requestBankVC({ variables: {
          "parameters": salted,
          "did": createDidFormat(walletId, chainId),
          "message": "test", // To be signed with DID (wallet)
          "type": "citizenship"
        }})
          .then(resVC =>
            {
              let vcJwt = resVC.data.bankVC;
              console.log('vcJwt', vcJwt);
              let vc = parseJwt(vcJwt);
              console.log('vc', vc);
              
              dispatch(setBankUserId(user.username));
              dispatch(setVerifiableCredential(vcJwt));
              dispatch(setBankCredential(vc));
              onNext();
            })
          // .catch(err => {
          //   console.log('ERROR2', err);
          //   dispatch(setBankUserId('ERROR2'));
          //   return err
          // })
        })
      // .catch(err => {
      //   console.log('ERROR1', err);

      //   dispatch(setBankUserId('ERROR1'));
      //   return err
      // })
    // connectBankMutation()
    //   .then(() => onNext())
    //   .catch(err => {
    //     setUser({
    //       ...user,
    //       connectionError: true
    //     })
    //     return err
    //   })
  }

  const onRetry = () => {
    setUser({
      ...user,
      connectionError: false
    })
  }

  return (
    <BaseContentLayout  {...{
      submitButtonProps: {
        label: user.connectionError ? t('page2.try_again') : t('submitBtn'),
        onClick: user.connectionError ? onRetry : onContinue,
        disabled: !user.username || !user.password || !walletId,
        style: user.connectionError ? styles.customButton : null
      }
    }} >
      <div className={styles.wrapper}>
        <h1>{t('page2.title')}</h1>

        <Image
          src="/bank.svg"
          height={143}
          width={315}
          alt="Banco Hipotecario"
        />

        <h4>{t('page2.access_note')}</h4>

        <div className={styles.lockparagraph}>
          <h4>{t('page2.data_note')}</h4>
          <Image
            src="/lock.svg"
            className={styles.bar}
            height={160}
            width={80}
            alt="Banco Hipotecario"
          />
        </div>

        { user.connectionError ? 
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
        }

        { !user.connectionError &&
          <div
            className={styles.skip}
            onClick={() => onNext()}
          >
            {t('page2.skip')}
          </div>
        }
    </div> 
  </BaseContentLayout>
  )
}

// const mapStateToProps = function(state) {
//   return {
//     wallet: state.user.walletId
//   }
// }

// export default connect(mapStateToProps)(BankAccountConnector)
export default BankAccountConnector;