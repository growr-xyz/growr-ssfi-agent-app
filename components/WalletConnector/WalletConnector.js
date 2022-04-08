import Image from "next/image";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { useWeb3React } from "@web3-react/core";
import { useMutation, gql } from "@apollo/client";
import { injected } from "../../utils/connectors";
import { setWalletId, acceptTerms, rejectTerms } from "../../redux/user";
import BaseContentLayout from "../../components/BaseContentLayout/BaseContentLayout";
import styles from "./WalletConnector.module.css";
import { useRouter } from "next/router";

import DataVaultWebClient, {
  // AuthManager,
  AsymmetricEncryptionManager,
} from "@rsksmart/ipfs-cpinner-client";
import AuthManager from "../../AuthManager";
import truncateAccount from "@/utils/truncateAccount";
import { Button } from "components";
import { createDidFormat } from "@/utils/vcUtils";

const serviceUrl = "https://data-vault.identity.rifos.org";

function WalletConnector({ onNext }) {
  const termsAccepted = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
    let did = createDidFormat(account, chainId);

    const encryptionManager =
      await AsymmetricEncryptionManager.fromWeb3Provider(window.ethereum);

    const dataVault = new DataVaultWebClient({
      serviceUrl,
      authManager: new AuthManager({
        did,
        serviceUrl,
        personalSign: (data) =>
          window.ethereum.request({
            method: "personal_sign",
            params: [data, account],
          }),
      }),
      encryptionManager,
    });

    const key = "Store";

    let result = await dataVault.get({ did, key });

    console.log("result", result);
    // const content = "this is my content 3";

    // // let info = await dataVault.getStorageInformation();

    // // console.log("info", info);
    // // const id = await dataVault.create({ key, content });
    // // console.log("id", id);

    // await dataVault.delete({
    //   key,
    //   id: "QmTwV6MzK3rnLgRL3XXbX4Uu4Xe6xf4ssb2mGu8i7AvSri",
    // });
  };

  const renderCustomButton = () => {
    return (
      <Button
        disabled={buttonIsActive}
        label="Reset Account"
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
