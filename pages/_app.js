import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import '../styles/globals.css'
import CustomHead from '../components/CustomHead/CustomHead'
import { NextIntlProvider } from "next-intl";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <NextIntlProvider messages={pageProps.messages}>
        <CustomHead />
        <Component {...pageProps} />
      </NextIntlProvider>
    </Provider>
  )
}

export default MyApp
