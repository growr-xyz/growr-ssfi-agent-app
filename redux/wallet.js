// Actions
export const CONNECT_WALLET = 'CONNECT_WALLET'
export const DISCONNECT_WALLET = 'DISCONNECT_WALLET'

// Action Creators
export const connectWallet = () => ({ type: CONNECT_WALLET })

export const disconnectWallet = () => ({ type: DISCONNECT_WALLET })

// Reducer
const connectWalletReducer = (state = false, { type }) => {
  switch (type) {
    case CONNECT_WALLET:
      return true
    case DISCONNECT_WALLET:
      return false
    default:
      return state
  }
}

export default connectWalletReducer
