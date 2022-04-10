import App from 'next/app';
import Web3 from 'web3';
import { useEffect } from 'react';
import { ethers } from 'ethers';
import { useStore } from 'react-redux';
import { wrapper } from '../redux/store';
import { PersistGate } from "redux-persist/integration/react";
import { NextIntlProvider } from "next-intl";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CustomHead from "../components/CustomHead/CustomHead";
import "../styles/globals.css";
import getConfig from "next/config";
import DVContextElement from "contexts/dvContext";
import { SessionProvider } from "next-auth/react";

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider, "any"); //new Web3(provider)
}

const { publicRuntimeConfig } = getConfig();

const client = new ApolloClient({
  uri: publicRuntimeConfig.backendUrl,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const store = useStore((state) => state);

  return process.browser ? (
    <NextIntlProvider messages={pageProps.messages}>
      <PersistGate
        loading={<div>Loading...</div>}
        persistor={store.__PERSISTOR}
      >
        <ApolloProvider client={client}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <SessionProvider session={session}>
              <DVContextElement>
                <CustomHead />
                <Component {...pageProps} />
              </DVContextElement>
            </SessionProvider>
          </Web3ReactProvider>
        </ApolloProvider>
      </PersistGate>
    </NextIntlProvider>
  ) : (
    <NextIntlProvider messages={pageProps.messages}>
      <PersistGate persistor={store}>
        <ApolloProvider client={client}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <SessionProvider session={session}>
              <CustomHead />
              <Component {...pageProps} />
            </SessionProvider>
          </Web3ReactProvider>
        </ApolloProvider>
      </PersistGate>
    </NextIntlProvider>
  );
}

export default wrapper.withRedux(MyApp);