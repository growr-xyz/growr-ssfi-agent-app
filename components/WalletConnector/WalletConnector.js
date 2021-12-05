import Image from 'next/image'
import { connect } from 'react-redux';
import { useTranslations } from "next-intl"
import { useWeb3React } from "@web3-react/core"
import { injected } from "../wallet/connectors"
import { setWalletId, acceptTerms, rejectTerms } from '../../redux/user'
import BaseContentLayout from '../../components/BaseContentLayout/BaseContentLayout'
import styles from "./WalletConnector.module.css";

function WalletConnector(props) {
  const { termsAccepted, label, onNext, setWalletId, acceptTerms, rejectTerms } = props

  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  const t = useTranslations("onboarding")

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  const onSubmit = () => {
    if (active && account) {
      setWalletId(account)
      onNext()
    }
  }

  const onChangeCheckbox = ({ target }) => target.checked ? acceptTerms() : rejectTerms()

  const truncateAccount = () => {
    const accountString = account.split('')
    const firstPart = accountString.filter((letter, index) => index < 5)
    const lastPart = accountString.filter((letter, index) => index > accountString.length - 3)
    return [...firstPart, '...', ...lastPart].join('')
  }

  return (
    <BaseContentLayout  {...{
      submitButtonProps: {
        onClick: onSubmit,
        disabled: !active || !account || !termsAccepted
      }
    }}>

    <div className={styles.container}>
      <h1>{ label }</h1>

      { active ?
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
    </div>

    </BaseContentLayout>
  )
}

const mapStateToProps = function(state) {
  return {
    termsAccepted: state.user.termsAccepted
  }
}

const mapDispatchToProps = {
  setWalletId,
  acceptTerms,
  rejectTerms
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletConnector)
