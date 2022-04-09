import Image from "next/image";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { useWeb3React } from "@web3-react/core";
import { useMutation, gql } from "@apollo/client";
import { injected } from "../../utils/connectors";
import {
  setWalletId,
  acceptTerms,
  rejectTerms,
  updateUserState,
} from "../../redux/user";
import { goToStep } from "../../redux/steps";
import BaseContentLayout from "../../components/BaseContentLayout/BaseContentLayout";
import styles from "./WalletConnector.module.css";
import { useRouter } from "next/router";

import { Button } from "components";
import truncateAccount from "@/utils/truncateAccount";
import useDataVault from "hooks/useDataVault";
import { dataVaultKeys } from "../../config/getConfig";

function WalletConnector({ onNext }) {
  const termsAccepted = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let dataVault = useDataVault();
  const { active, account, chainId, activate, deactivate } = useWeb3React();

  const t = useTranslations("onboarding");

  const router = useRouter();

  useEffect(() => {
    try {
      activate(injected, undefined, true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const onSubmit = () => {
    if (active && account) {
      dispatch(setWalletId(account));

      onNext(); // .catch((err) => err);
      // createWallet().then(() =>
      //   createUser()
      //     .then(() => onNext().catch((err) => err))
      //     .catch((err) => err)
      // );
    }
  };

  const onChangeCheckbox = ({ target }) =>
    target.checked ? dispatch(acceptTerms()) : dispatch(rejectTerms());

  const buttonIsActive = !active || !account || !termsAccepted;

  const onCustonButtonClick = async () => {
    let result = await dataVault.get({ key: dataVaultKeys.onboarding });
    console.log(result);
    try {
      if (result.length) {
        const latestState = result.pop();
        // something metamask don't ask the user to decrypt and davaVault returns encrypted
        // when we try to JSON.parse the data it throws an error, so we try-catch it to move to the next step
        dispatch(updateUserState(JSON.parse(latestState.content)));
        dispatch(goToStep(4));
      } else {
        throw new Error();
      }
    } catch (err) {
      onSubmit();
    }
  };

  const renderCustomButton = () => {
    return (
      <Button
        disabled={buttonIsActive}
        label="Restore Account"
        onClick={onCustonButtonClick}
      />
    );
  };

  return (
    <BaseContentLayout
      {...{
        submitButtonProps: {
          label: t("submitBtn"),
          onClick: onSubmit,
          disabled: buttonIsActive,
        },
        renderCustomButton,
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Image src="/logo.svg" height={56} width={195} alt="Logo" />
        </div>

        <h1 className={styles.title}>{t("page1.title")}</h1>

        {active ? (
          <div className={styles.connected} onClick={disconnect}>
            <span className={styles.usernumber}>
              {truncateAccount(account)}
            </span>
            <Image src="/logout.svg" height={32} width={32} alt="Logout" />
          </div>
        ) : (
          <div className={styles.disconnected}>
            <Image
              src="/metamask.svg"
              height={95}
              width={304}
              alt="MetaMask"
              onClick={connect}
            />
          </div>
        )}

        <div className={styles.terms}>
          <input
            className={styles.checkbox}
            id="terms"
            name="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={onChangeCheckbox}
          />
          <label htmlFor="terms">{t("page7.confirmCheck")}</label>
        </div>

        <div
          className={styles.switch}
          onClick={() => {
            router.push(`/`, `/`, {
              locale: router.locale == "es" ? "en" : "es",
            });
          }}
        >
          {t("page7.switchLang")}
        </div>
      </div>
    </BaseContentLayout>
  );
}

export default WalletConnector;
