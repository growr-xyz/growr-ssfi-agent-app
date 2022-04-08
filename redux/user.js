import { bindActionCreators } from "redux";

// Actions
export const SET_USER_ID = 'SET_USER_ID';
export const SET_WALLET_ID = 'SET_WALLET_ID';
export const SET_BANK_USER_ID = 'SET_BANK_USER_ID';
export const SET_VERIFIABLE_CREDENTIAL = 'SET_VERIFIABLE_CREDENTIAL';
export const SET_BANK_CREDENTIAL = 'SET_BANK_CREDENTIAL';
export const SET_FINANCES = 'SET_FINANCES';
export const SET_GOAL = 'SET_GOAL';
export const SET_POND_ADDRESS = 'SET_POND_ADDRESS';
export const ACCEPT_TERMS = 'ACCEPT_TERMS';
export const REJECT_TERMS = 'REJECT_TERMS';
export const ACCEPT_GROWR_TERMS = 'ACCEPT_GROWR_TERMS';
export const REJECT_GROWR_TERMS = 'REJECT_GROWR_TERMS';

// Action Creators
export const setUserId = query => ({ type: SET_USER_ID, query});

export const setWalletId = (walletId, chainId) => ({ type: SET_WALLET_ID, query: {walletId, chainId}});

export const setBankUserId = (query) => ({ type: SET_BANK_USER_ID, query});

export const setVerifiableCredential = (query) => ({ type: SET_VERIFIABLE_CREDENTIAL, query});

export const setBankCredential = (query) => ({ type: SET_BANK_CREDENTIAL, query});

export const setFinances = (query) => ({ type: SET_FINANCES, query});

export const setGoal = (query) => ({ type: SET_GOAL, query});

export const setPondAddress = (goalId, pondAddress) => ({ type: SET_POND_ADDRESS, query: {goalId, pondAddress}});

export const acceptTerms = () => ({ type: ACCEPT_TERMS });

export const rejectTerms = () => ({ type: REJECT_TERMS });

export const acceptGrowrTerms = () => ({ type: ACCEPT_GROWR_TERMS });

export const rejectGrowrTerms = () => ({ type: REJECT_GROWR_TERMS });

// Reducer
export const initialState = {
  userId: '',
  walletId: '',
  chainId: 0,
  bankUserId: '',
  termsAccepted: false,
  growrTermsAccepted: false,
  verifiableCredentials: [],
  bankCredentials: [],
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
      pondAddress: '',
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
      console.log('SET_WALLET_ID', query);
      return {
        ...state,
        walletId: query.walletId,
        chainId: query.chainId
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
    case SET_VERIFIABLE_CREDENTIAL:
      return {
        ...state,
        // TODO: Handle add/replace
        verifiableCredentials: [query]
      };
    case SET_BANK_CREDENTIAL:
      return {
        ...state,
        // TODO: Handle add/replace
        bankCredentials: [query]
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
    case SET_POND_ADDRESS:
      console.log('SET_POND_ADDRESS', query);
      return {
        ...state,
        goals: state.goals.map(goal => {
          if (goal.goalId !== query.goalId) return goal;
          
          // We found the goal => update the pondAddress
          console.log('update goal', goal.goalId);
          return {
            ...goal,
            loan: {
              ...goal.loan,
              pondAddress: query.pondAddress
            }
          }
        })
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