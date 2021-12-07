// Actions
export const SET_USER_ID = "SET_USER_ID"
export const SET_WALLET_ID = 'SET_WALLET_ID'
export const SET_GOAL_ID = 'SET_GOAL_ID'
export const SET_WALLET_BALANCE = 'SET_WALLET_BALANCE'
export const ACCEPT_TERMS = 'ACCEPT_TERMS'
export const REJECT_TERMS = 'REJECT_TERMS'
export const ACCEPT_GROWR_TERMS = 'ACCEPT_GROWR_TERMS'
export const REJECT_GROWR_TERMS = 'REJECT_GROWR_TERMS'

// Action Creators
export const setUserId = query => ({ type: SET_USER_ID, query})

export const setWalletId = (query) => ({ type: SET_WALLET_ID, query})

export const setGoalId = (query) => ({ type: SET_GOAL_ID, query})

export const setWalletBalance = (query) => ({ type: SET_WALLET_BALANCE, query})

export const acceptTerms = () => ({ type: ACCEPT_TERMS })

export const rejectTerms = () => ({ type: REJECT_TERMS })

export const acceptGrowrTerms = () => ({ type: ACCEPT_GROWR_TERMS })

export const rejectGrowrTerms = () => ({ type: REJECT_GROWR_TERMS })

// Reducer
export const initialState = {
  user_id: '',
  wallet_id: '',
  goal_id: '',
  balance: 0,
  termsAccepted: false,
  GrowrTermsAccepted: false,
  loan: {
    amount_title: '$1200',
    amount: '$1200 (0.024 RBTC)',
    apr: '29.95%',
    duration: '12 months',
    instalment: '$116.96',
    next_instalment: '30/12/2021',
    last_instalment: '30/11/2022',
    total_to_repay: '$1403.46',
    total_interest: '$203.45'
  }
}

const userReducer = (state = initialState, { type, query }) => {
  switch (type) {
    case SET_WALLET_ID:
      return {
        ...state,
        wallet_id: query
      }
    case SET_USER_ID:
      return {
        ...state,
        user_id: query
      }
    case SET_GOAL_ID:
      return {
        ...state,
        goal_id: query
      }
    case SET_WALLET_BALANCE:
      return {
        ...state,
        balance: query
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
    case ACCEPT_GROWR_TERMS:
        return {
          ...state,
          GrowrTermsAccepted: true
        }
    case REJECT_GROWR_TERMS:
        return {
          ...state,
          GrowrTermsAccepted: false
        }
    default:
      return state
  }
}

export default userReducer
