import { bindActionCreators } from "redux";

// Actions
export const SET_USER_ID = "SET_USER_ID";
export const SET_WALLET_ID = "SET_WALLET_ID";
export const SET_BANK_USER_ID = "SET_BANK_USER_ID";
export const SET_VERIFIABLE_CREDENTIAL = "SET_VERIFIABLE_CREDENTIAL";
export const SET_BANK_CREDENTIAL = "SET_BANK_CREDENTIAL";
export const SET_FINANCES = "SET_FINANCES";
export const SET_GOAL = "SET_GOAL";
export const SET_OFFER = "SET_OFFER";
export const ACCEPT_TERMS = "ACCEPT_TERMS";
export const REJECT_TERMS = "REJECT_TERMS";
export const ACCEPT_GROWR_TERMS = "ACCEPT_GROWR_TERMS";
export const REJECT_GROWR_TERMS = "REJECT_GROWR_TERMS";
export const UPDATE_USER = "UPDATE_USER";

// Action Creators
export const setUserId = (query) => ({ type: SET_USER_ID, query });

export const setWalletId = (walletId, chainId) => ({
  type: SET_WALLET_ID,
  query: { walletId, chainId },
});

export const setBankUserId = (query) => ({ type: SET_BANK_USER_ID, query });

export const setVerifiableCredential = (query) => ({
  type: SET_VERIFIABLE_CREDENTIAL,
  query,
});

export const setBankCredential = (query) => ({
  type: SET_BANK_CREDENTIAL,
  query,
});

export const setFinances = (query) => ({ type: SET_FINANCES, query });

export const setGoal = (query) => ({ type: SET_GOAL, query });

export const setOffer = (goalId, offer) => ({
  type: SET_OFFER,
  query: { goalId, offer },
});

export const acceptTerms = () => ({ type: ACCEPT_TERMS });

export const rejectTerms = () => ({ type: REJECT_TERMS });

export const acceptGrowrTerms = () => ({ type: ACCEPT_GROWR_TERMS });

export const rejectGrowrTerms = () => ({ type: REJECT_GROWR_TERMS });

export const updateUserState = (query) => ({ type: UPDATE_USER, query });

// Reducer
export const initialState = {
  userId: "",
  walletId: "",
  chainId: 0,
  bankUserId: "",
  termsAccepted: false,
  growrTermsAccepted: false,
  verifiableCredentials: [],
  bankCredentials: [],
  finances: {
    income: 0,
    other: 0,
    unofficial: 0,
    expenses: 0,
    dependants: 0,
  },
  goals: [
    {
      goalId: "",
      goalType: "",
      loanDuration: 0,
      amountSaved: 0,
      amountNeeded: 0,
      isAchieved: false,
      offer: {
        pondAddress: "",
        amount: 0,
        annualInterestRate: 0,
        approved: false,
        cashBackRate: 0,
        disbursmentFee: 0,
        duration: 0,
        installmentAmount: 0,
        totalAmount: 0,
        totalInterest: 0,
      },
      loan: {
        amount: 0,
        annualPercentageRate: 0,
        duration: 0,
        instalment: 0,
        nextInstalment: "2022-01-01",
        lastInstalment: "2022-01-01",
        totalToRepay: 0,
        totalInterest: 0,
        outstanding: 0,
      },
    },
  ],
};

const userReducer = (state = initialState, { type, query }) => {
  switch (type) {
    case SET_WALLET_ID:
      console.log("SET_WALLET_ID", query);
      return {
        ...state,
        walletId: query.walletId,
        chainId: query.chainId,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: query,
      };
    case SET_BANK_USER_ID:
      return {
        ...state,
        bankUserId: query,
      };
    case SET_VERIFIABLE_CREDENTIAL:
      return {
        ...state,
        // TODO: Handle add/replace
        verifiableCredentials: [query],
      };
    case SET_BANK_CREDENTIAL:
      return {
        ...state,
        // TODO: Handle add/replace
        bankCredentials: [query],
      };
    case SET_FINANCES:
      return {
        ...state,
        finances: query,
      };
    case SET_GOAL:
      return {
        ...state,
        goals: [query],
      };
    case SET_OFFER:
      console.log("SET_OFFER", query.goalId, query.offer);
      return {
        ...state,
        goals: state.goals.map((goal) => {
          if (goal.goalId !== query.goalId) return goal;

          // We found the goal => update the pondAddress
          console.log("update goal", goal.goalId);
          const newGoal = {
            ...goal,
            offer: query.offer,
          };
          console.log("newGoal", newGoal);
          return newGoal;
        }),
      };
    case ACCEPT_TERMS:
      return {
        ...state,
        termsAccepted: true,
      };
    case REJECT_TERMS:
      return {
        ...state,
        termsAccepted: false,
      };
    case ACCEPT_GROWR_TERMS:
      return {
        ...state,
        growrTermsAccepted: true,
      };
    case REJECT_GROWR_TERMS:
      return {
        ...state,
        growrTermsAccepted: false,
      };
    case REJECT_GROWR_TERMS:
      return {
        ...state,
        growrTermsAccepted: false,
      };
    case UPDATE_USER:
      return query;
    default:
      return state;
  }
};

export default userReducer;
