import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { useWeb3React } from "@web3-react/core"
import { injected } from "../wallet/connectors"
import { connectWallet, disconnectWallet } from '../../redux/wallet'
import BaseContentLayout from '../../components/BaseContentLayout/BaseContentLayout'
import styles from "./WalletConnector.module.css";

export default function WalletConnector({ label, step, total, onNext }) {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const dispatch = useDispatch()

  async function connect() {
    try {
      await activate(injected)
      dispatch(connectWallet())
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      dispatch(disconnectWallet())
    } catch (ex) {
      console.log(ex)
    }
  }

  const onSubmit = () => active && account && onNext()

  const truncateAccount = () => {
    const accountString = account.split('')
    const firstPart = accountString.filter((letter, index) => index < 5)
    const lastPart = accountString.filter((letter, index) => index > accountString.length - 3)
    return [...firstPart, '...', ...lastPart]
  }

  return (
    <BaseContentLayout  {...{
      submitButtonProps: {
        onClick: onSubmit,
        disabled: !active || !account
      }
    }}>

    <div className={styles.container}>
      <h1>{ label }</h1>

      {
      active ?
        <div
          className={styles.connected}
          onClick={disconnect}
        >
          {truncateAccount()}
        </div>
        :
        <Image
          src="/mm.png"
          className={styles.disconnected}
          height={143}
          width={315}
          alt="MetaMask"
          onClick={connect}
        />
      }
    </div>

    </BaseContentLayout>
  )
}
