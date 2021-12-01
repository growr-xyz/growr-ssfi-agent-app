import '../styles/globals.css'
import CustomHead from '../components/CustomHead/CustomHead'
import { NextIntlProvider } from "next-intl";

function MyApp({ Component, pageProps }) {
  return  <>
    <NextIntlProvider messages={pageProps.messages}>
      <CustomHead />
      <Component {...pageProps} />
    </NextIntlProvider>
  </>
}

export default MyApp
