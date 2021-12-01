import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import '../styles/globals.css'
import CustomHead from '../components/CustomHead/CustomHead'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <CustomHead />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
