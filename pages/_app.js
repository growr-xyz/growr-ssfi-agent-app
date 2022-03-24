import App from 'next/app'
import Web3 from 'web3'
import { useStore } from 'react-redux'
import { wrapper } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
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
  uri: publicRuntimeConfig.backendUrl,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  // const { Component, pageProps, store } = props;
  // console.log('!!!!!!!! Store:', store.getState());

  return process.browser ? (
    <NextIntlProvider messages={pageProps.messages}>
      <PersistGate loading={<div>Loading...</div>} persistor={store.__PERSISTOR}>
        <ApolloProvider client={client}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <CustomHead />
            <Component {...pageProps} />
          </Web3ReactProvider>
        </ApolloProvider>
      </PersistGate>
    </NextIntlProvider>) : (
    <NextIntlProvider messages={pageProps.messages}>
      <PersistGate persistor={store}>
        <ApolloProvider client={client}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <CustomHead />
            <Component {...pageProps} />
          </Web3ReactProvider>
        </ApolloProvider>
      </PersistGate>
    </NextIntlProvider>
  );
}

export default wrapper.withRedux(MyApp);
//export default withRedux(reduxStore)(MyApp)
