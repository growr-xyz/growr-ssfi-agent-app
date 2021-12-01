import Image from 'next/image'
import { useWeb3React } from "@web3-react/core"
import { injected } from "../wallet/connectors"
import { useDispatch } from 'react-redux'
import { connectWallet, disconnectWallet } from '../../redux/wallet'
import styles from "./WalletConnector.module.css";

export default function WalletConnector({ label }) {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const dispatch = useDispatch()

  async function connect() {
    try {
      await activate(injected)
      console.log('wallet connected')
      dispatch(connectWallet())
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      console.log('wallet disconnected')
      dispatch(disconnectWallet())
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div className={styles.container}>
      <h1>{ label }</h1>

      {!active ?
        <Image
          src="/mm.png"
          height={143}
          width={315}
          alt="Avatar"
          onClick={connect}
        />
      :
        <div
          className={styles.connected}
          onClick={disconnect}
        >
          {account}
        </div>
      }
    </div>
  )
}
