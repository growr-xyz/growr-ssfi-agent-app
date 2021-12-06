import Web3 from 'web3'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import { NextIntlProvider } from "next-intl"
import { Web3ReactProvider } from '@web3-react/core'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import CustomHead from '../components/CustomHead/CustomHead'
import '../styles/globals.css'
import getConfig from 'next/config'

function getLibrary(provider) {
  return new Web3(provider)
}

const { publicRuntimeConfig } = getConfig()

const client = new ApolloClient({
  //uri: 'http://localhost:4000', 
  uri: publicRuntimeConfig.backendUrl,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <NextIntlProvider messages={pageProps.messages}>
            <CustomHead />
            <Component {...pageProps} />
          </NextIntlProvider>
        </Web3ReactProvider>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
