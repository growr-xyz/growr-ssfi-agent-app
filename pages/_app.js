import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import { NextIntlProvider } from "next-intl";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import CustomHead from '../components/CustomHead/CustomHead'
import '../styles/globals.css'

function getLibrary(provider) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <NextIntlProvider messages={pageProps.messages}>
          <CustomHead />
          <Component {...pageProps} />
        </NextIntlProvider>
      </Web3ReactProvider>
    </Provider>
  )
}

export default MyApp
