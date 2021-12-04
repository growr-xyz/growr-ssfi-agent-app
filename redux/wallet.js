// Actions
export const CONNECT_WALLET = 'CONNECT_WALLET'
export const DISCONNECT_WALLET = 'DISCONNECT_WALLET'
export const ACCEPT_TERMS = 'ACCEPT_TERMS'
export const REJECT_TERMS = 'REJECT_TERMS'

// Action Creators
export const connectWallet = () => ({ type: CONNECT_WALLET })

export const disconnectWallet = () => ({ type: DISCONNECT_WALLET })

export const acceptTerms = () => ({ type: ACCEPT_TERMS })

export const rejectTerms = () => ({ type: REJECT_TERMS })

// Reducer
export const initialState = {
  walletConnected: false,
  termsAccepted: false
}

const connectWalletReducer = (state = initialState, { type }) => {
  switch (type) {
    case CONNECT_WALLET:
      return {
        ...state,
        walletConnected: true
      }
    case DISCONNECT_WALLET:
      return {
        ...state,
        walletConnected: false
      }
    case ACCEPT_TERMS:
      return {
        ...state,
        termsAccepted: true
      }
    case REJECT_TERMS:
      return {
        ...state,
        termsAccepted: false
      }
    default:
      return state
  }
}

export default connectWalletReducer
