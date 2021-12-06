import Image from 'next/image'
import { connect } from 'react-redux';
import { useWeb3React } from "@web3-react/core"
import { injected } from "../wallet/connectors"
import { setWalletId } from '../../redux/user'
import styles from "./SimpleConnector.module.css";

function SimpleConnector({ setWalletId }) {
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
    <div className={styles.container}>
      { active ?
        <div
          className={styles.connected}
          onClick={onProceed}
        >
          Go to my dashboard
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
      <div />
    </div>
  )
}

const mapDispatchToProps = {
  setWalletId
}

export default connect(null, mapDispatchToProps)(SimpleConnector)
