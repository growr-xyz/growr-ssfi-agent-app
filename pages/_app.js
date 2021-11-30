import '../styles/globals.css'
import CustomHead from '../components/CustomHead/CustomHead'

function MyApp({ Component, pageProps }) {
  return  <>
    <CustomHead />
    <Component {...pageProps} />
  </>
}

export default MyApp
