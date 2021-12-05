// Actions
export const SET_ID = 'SET_ID'
export const SET_USER_ID = "SET_USER_ID"
export const ACCEPT_TERMS = 'ACCEPT_TERMS'
export const REJECT_TERMS = 'REJECT_TERMS'
export const ACCEPT_GROWR_TERMS = 'ACCEPT_GROWR_TERMS'
export const REJECT_GROWR_TERMS = 'REJECT_GROWR_TERMS'

// Action Creators
export const setId = (query) => ({ type: SET_ID, query})

export const setUserId = query => ({ type: SET_USER_ID, query})

export const acceptTerms = () => ({ type: ACCEPT_TERMS })

export const rejectTerms = () => ({ type: REJECT_TERMS })

export const acceptGrowrTerms = () => ({ type: ACCEPT_GROWR_TERMS })

export const rejectGrowrTerms = () => ({ type: REJECT_GROWR_TERMS })

// Reducer
export const initialState = {
  id: '',
  user_id: '',
  termsAccepted: false,
  GrowrTermsAccepted: false,
  loan: {
    amount: '$1200',
    apr: '29.95%',
    duration: '12 months',
    instalment: '$116.96',
    next_instalment: '30/12/2021',
    last_instalment: '30/11/2022',
    total_to_repay: '$1403.46',
    total_interest: '$203.46'
  }
}

const userReducer = (state = initialState, { type, query }) => {
  switch (type) {
    case SET_ID:
      return {
        ...state,
        id: query
      }
    case SET_USER_ID:
      return {
        ...state,
        user_id: query
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
