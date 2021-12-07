import Image from 'next/image'
import { connect } from 'react-redux';
import router from "next/router";
import { useTranslations } from 'use-intl';
import { useWeb3React } from "@web3-react/core"
import { injected } from "../wallet/connectors"
import { setWalletId } from '../../redux/user'
import styles from "./SimpleConnector.module.css";

function SimpleConnector({ setWalletId }) {
  const t = useTranslations("dashboard")
  const { active, account, activate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  const onProceed = () => {
    if (active && account) {
      setWalletId(account)
    }
  }

  return (
    <div className={styles.wrapper}>
      <Image
        src="/logo.svg"
        height={56}
        width={195}
        alt="Logo"
      />

      { active ?
        <div
          className={styles.connected}
          onClick={onProceed}
        >
          {t("go_to")}
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

      <div
        className={styles.switch}
        onClick={() => {
          if (router.locale == "es") {
            router.push(`/dashboard`, `/dashboard`, { locale: "en" });
          } else {
            router.push(`/dashboard`, `/dashboard`, { locale: "es" });
          }
        }}
      >
        {t("switchLang")}
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  setWalletId
}

export default connect(null, mapDispatchToProps)(SimpleConnector)
