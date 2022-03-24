import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { useWeb3React } from '@web3-react/core';
import { useMutation,  gql } from '@apollo/client';
import { injected } from '../wallet/connectors';
import { setWalletId, acceptTerms, rejectTerms } from '../../redux/user';
import BaseContentLayout from '../../components/BaseContentLayout/BaseContentLayout';
import styles from './WalletConnector.module.css';
import { useRouter } from 'next/router';

function WalletConnector({ onNext }) {
  const termsAccepted = useSelector((state) => state.user.termsAccepted);
  const dispatch = useDispatch();

  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  const t = useTranslations("onboarding");

  const router = useRouter();

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

  const truncateAccount = () => {
    const accountString = account.split("");
    const firstPart = accountString.filter((letter, index) => index < 5);
    const lastPart = accountString.filter(
      (letter, index) => index > accountString.length - 3
    );
    return [...firstPart, "...", ...lastPart].join("");
  };

  // const CREATE_WALLET = gql`
  //   mutation createWallet {
  //     createWallet(newWallet:{address:"${account}", vendor:"RSK", network:"testnet"}){
  //       address,
  //       network
  //     }
  //   }
  // `;

  // const CREATE_USER = gql`
  //   mutation createUser{
  //     updateUser(userData:{fullName:"IvanAsen"}, address:"${account}"){
  //       _id
  //     }
  //   }
  // `;

  // const [createWallet] = useMutation(CREATE_WALLET);
  // const [createUser] = useMutation(CREATE_USER);

  return (
    <BaseContentLayout {...{
      submitButtonProps: {
        label: t('submitBtn'),
        onClick: onSubmit,
        disabled: !active || !account || !termsAccepted
      }
    }}>

    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Image
          src="/logo.svg"
          height={56}
          width={195}
          alt="Logo"
        />
      </div>
      
      <h1 className={styles.title}>{t('page1.title')}</h1>

      {active ?
        <div
          className={styles.connected}
          onClick={disconnect}
        >
          <span className={styles.usernumber}>{truncateAccount()}</span>
          <Image
            src="/logout.svg"
            height={32}
            width={32}
            alt="Logout"
          />
        </div>
        :
        <div className={styles.disconnected}>
          <Image
            src="/metamask.svg"
            height={95}
            width={304}
            alt="MetaMask"
            onClick={connect}
          />
        </div>
      }

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
            if (router.locale == "es") {
              router.push(`/`, `/`, { locale: "en" });
            } else {
              router.push(`/`, `/`, { locale: "es" });
            }
          }}
        >
          {t("page7.switchLang")}
        </div>
      </div>
    </BaseContentLayout>
  );
}

export default WalletConnector;