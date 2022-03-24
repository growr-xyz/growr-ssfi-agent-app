// Actions
export const SET_USER_ID = 'SET_USER_ID';
export const SET_WALLET_ID = 'SET_WALLET_ID';
export const SET_BANK_USER_ID = 'SET_BANK_USER_ID';
export const SET_FINANCES = 'SET_FINANCES';
export const SET_GOAL = 'SET_GOAL';
export const ACCEPT_TERMS = 'ACCEPT_TERMS';
export const REJECT_TERMS = 'REJECT_TERMS';
export const ACCEPT_GROWR_TERMS = 'ACCEPT_GROWR_TERMS';
export const REJECT_GROWR_TERMS = 'REJECT_GROWR_TERMS';

// Action Creators
export const setUserId = query => ({ type: SET_USER_ID, query});

export const setWalletId = (query) => ({ type: SET_WALLET_ID, query});

export const setBankUserId = (query) => ({ type: SET_BANK_USER_ID, query});

export const setFinances = (query) => ({ type: SET_FINANCES, query});

export const setGoal = (query) => ({ type: SET_GOAL, query});

export const acceptTerms = () => ({ type: ACCEPT_TERMS });

export const rejectTerms = () => ({ type: REJECT_TERMS });

export const acceptGrowrTerms = () => ({ type: ACCEPT_GROWR_TERMS });

export const rejectGrowrTerms = () => ({ type: REJECT_GROWR_TERMS });

// Reducer
export const initialState = {
  userId: '',
  walletId: '',
  bankUserId: '',
  termsAccepted: false,
  growrTermsAccepted: false,
  finances: {
    income: 0,
    other: 0,
    unofficial: 0,
    expenses: 0,
    dependants: 0
  },
  goals: [{
    goalId: '',
    goalType: '',
    loanDuration: 0,
    amountSaved: 0,
    amountNeeded: 0,
    isAchieved: false,
    loan: {
      amount: 1200,
      annualPercentageRate: 0.2995,
      duration: 12,
      instalment: 116.96,
      nextInstalment: '2022-03-31',
      lastInstalment: '2023-02-28',
      totalToRepay: 1403.46,
      totalInterest: 203.46,
      outstanding: 1200
    }
  }],
};

const userReducer = (state = initialState, { type, query }) => {
  switch (type) {
    case SET_WALLET_ID:
      return {
        ...state,
        walletId: query
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: query
      };
    case SET_BANK_USER_ID:
      return {
        ...state,
        bankUserId: query
      };
    case SET_FINANCES:
      return {
        ...state,
        finances: query
      };
    case SET_GOAL:
      return {
        ...state,
        goals: [query]
      };
    case ACCEPT_TERMS:
      return {
        ...state,
        termsAccepted: true
      };
    case REJECT_TERMS:
      return {
        ...state,
        termsAccepted: false
      };
    case ACCEPT_GROWR_TERMS:
      return {
        ...state,
        growrTermsAccepted: true
      };
    case REJECT_GROWR_TERMS:
      return {
        ...state,
        growrTermsAccepted: false
      };
    default:
      return state;
  }
}

export default userReducer;