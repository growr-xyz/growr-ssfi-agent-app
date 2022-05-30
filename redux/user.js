// Actions
export const SET_USER_ID = "SET_USER_ID";
export const SET_WALLET_AND_CHAIN = "SET_WALLET_AND_CHAIN";
export const SET_BALANCE = "SET_BALANCE";
export const SET_BANK_USER_ID = "SET_BANK_USER_ID";
export const SET_VERIFIABLE_CREDENTIALS = "SET_VERIFIABLE_CREDENTIALS";
export const SET_BANK_CREDENTIALS = "SET_BANK_CREDENTIALS";
export const SET_FINANCES = "SET_FINANCES";
export const SET_GOAL = "SET_GOAL";
export const SET_OFFER = "SET_OFFER";
export const SET_LOAN = "SET_LOAN";
export const ACCEPT_TERMS = "ACCEPT_TERMS";
export const REJECT_TERMS = "REJECT_TERMS";
export const ACCEPT_GROWR_TERMS = "ACCEPT_GROWR_TERMS";
export const REJECT_GROWR_TERMS = "REJECT_GROWR_TERMS";
export const UPDATE_USER = "UPDATE_USER";

// Action Creators
export const setUserId = (query) => ({ type: SET_USER_ID, query });
export const setWalletId = (walletId, chainId) => ({
  type: SET_WALLET_AND_CHAIN,
  query: { walletId, chainId },
});
export const setBalance = (balance) => ({ type: SET_BALANCE, query: balance });
export const setBankUserId = (bankUserId) => ({
  type: SET_BANK_USER_ID,
  query: bankUserId,
});
export const setVerifiableCredentials = (verifiableCredentials) => ({
  type: SET_VERIFIABLE_CREDENTIALS,
  query: verifiableCredentials,
});
export const setBankCredentials = (bankCredentials) => ({
  type: SET_BANK_CREDENTIALS,
  query: bankCredentials,
});
export const setFinances = (query) => ({ type: SET_FINANCES, query });
export const setGoal = (query) => ({ type: SET_GOAL, query });
export const setOffer = (goalId, offer) => ({
  type: SET_OFFER,
  query: { goalId, offer },
});
export const setLoan = (goalId, loan) => ({
  type: SET_LOAN,
  query: { goalId, loan },
});
export const acceptTerms = () => ({ type: ACCEPT_TERMS });
export const rejectTerms = () => ({ type: REJECT_TERMS });
export const acceptGrowrTerms = () => ({ type: ACCEPT_GROWR_TERMS });
export const rejectGrowrTerms = () => ({ type: REJECT_GROWR_TERMS });
export const updateUserState = (query) => ({ type: UPDATE_USER, query });

let user = {
  userId: "",
  walletId: "0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
  chainId: 31,
  balance: 0,
  bankUserId: "ffdcuser2",
  termsAccepted: false,
  growrTermsAccepted: false,
  verifiableCredentials: [
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQWdlIl0sImNyZWRlbnRpYWxTY2hlbWEiOnsiaWQiOiJkaWQ6ZXRocjpyc2s6MHg2YTMwMzVlYzMxMzdiZWViNjc4OWZmYTkwODk4Y2NhZDVjZDA2Zjc5O2lkPTAzMWM5ODgzLTBmOTQtNGQyNi04ZmJkLWM3M2FlZjQwN2NlNTt2ZXJzaW9uPTEuMCIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJhZ2UiOjUzfX0sInN1YiI6ImRpZDpldGhyOnJzazp0ZXN0bmV0OjB4RjlBOWVBNzkzNEZFOUZEMTE3QjVmODMzN0RiYjI4ZjhiRjRGRTA5MCIsIm5iZiI6MTY1MTUxNTE4OCwiaXNzIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHg5MTVEMWE0MEI5YjFhZDUxZkYzODMzODYyNGQwMjlFNzk3OWE5NEI1In0.aCmwhY4SRPkBIWM66xK6wXkUlcYymg5m6W-emaD6DSlch6TptwLxjm3wNncTkkJ0j5r0i-HsLJbj8qN8D2VSvQ",
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSGFzS1lDIl0sImNyZWRlbnRpYWxTY2hlbWEiOnsiaWQiOiJkaWQ6ZXRocjpyc2s6MHg2YTMwMzVlYzMxMzdiZWViNjc4OWZmYTkwODk4Y2NhZDVjZDA2Zjc5O2lkPWMxN2RmMzRlLTEwNGEtNGVmZi04NWUxLWNjNDVlNjU5YjJkYzt2ZXJzaW9uPTEuMCIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJoYXNLWUMiOnRydWV9fSwic3ViIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHhGOUE5ZUE3OTM0RkU5RkQxMTdCNWY4MzM3RGJiMjhmOGJGNEZFMDkwIiwibmJmIjoxNjUxNTE1MTg4LCJpc3MiOiJkaWQ6ZXRocjpyc2s6dGVzdG5ldDoweDkxNUQxYTQwQjliMWFkNTFmRjM4MzM4NjI0ZDAyOUU3OTc5YTk0QjUifQ.NpE5a-sAK9axw53P1XwghGPzY30-mKMigRnqlvIKIYQwBwRgi_Qaj5vj003os10u-tDCVBjnO519GMzod-Ybjg",
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQ2l0aXplbnNoaXAiXSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6ImRpZDpldGhyOnJzazoweDZhMzAzNWVjMzEzN2JlZWI2Nzg5ZmZhOTA4OThjY2FkNWNkMDZmNzk7aWQ9MjM3MzBhMWQtOGYyNS00YzZhLWI1MjctN2Y4YWQ5MDFlZWE5O3ZlcnNpb249MS4wIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImNpdGl6ZW5zaGlwIjoiRkwifX0sInN1YiI6ImRpZDpldGhyOnJzazp0ZXN0bmV0OjB4RjlBOWVBNzkzNEZFOUZEMTE3QjVmODMzN0RiYjI4ZjhiRjRGRTA5MCIsIm5iZiI6MTY1MTUxNTE4OCwiaXNzIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHg5MTVEMWE0MEI5YjFhZDUxZkYzODMzODYyNGQwMjlFNzk3OWE5NEI1In0.SN0KGtciTp9qvI4pVkSu0RV9R0QAA8VjOAATSoadr5t4gWT8jbYCjyx5xIkLsBw1ergmMbbCS3EMwhLda8e_zQ",
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQXZnTW9udGhseUluY29tZSJdLCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiZGlkOmV0aHI6cnNrOjB4NmEzMDM1ZWMzMTM3YmVlYjY3ODlmZmE5MDg5OGNjYWQ1Y2QwNmY3OTtpZD0yNmMzMzRkNS1lZTA3LTRkYWUtYTc4OS0wNWUzYTYyNzdkNzE7dmVyc2lvbj0xLjAiLCJ0eXBlIjoiSnNvblNjaGVtYVZhbGlkYXRvcjIwMTgifSwiY3JlZGVudGlhbFN1YmplY3QiOnsiYXZnTW9udGhseUluY29tZSI6MTU2fX0sInN1YiI6ImRpZDpldGhyOnJzazp0ZXN0bmV0OjB4RjlBOWVBNzkzNEZFOUZEMTE3QjVmODMzN0RiYjI4ZjhiRjRGRTA5MCIsIm5iZiI6MTY1MTUxNTE4OCwiaXNzIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHg5MTVEMWE0MEI5YjFhZDUxZkYzODMzODYyNGQwMjlFNzk3OWE5NEI1In0.0Uw3CHeNCuawfm-uaOHEoiKHlqt22y8t88XQ4vvAcXAEaR-eUtFIicKyF3EGbEM0zyniTaUxQlWy7J-9BrsWAg",
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQXZnTW9udGhseVJlc3QiXSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6ImRpZDpldGhyOnJzazoweDZhMzAzNWVjMzEzN2JlZWI2Nzg5ZmZhOTA4OThjY2FkNWNkMDZmNzk7aWQ9ZTNhODMxMTYtYzIyNi00M2FiLWFiMjktYTY0N2ExZDJjYjVlO3ZlcnNpb249MS4wIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImF2Z01vbnRobHlSZXN0IjowfX0sInN1YiI6ImRpZDpldGhyOnJzazp0ZXN0bmV0OjB4RjlBOWVBNzkzNEZFOUZEMTE3QjVmODMzN0RiYjI4ZjhiRjRGRTA5MCIsIm5iZiI6MTY1MTUxNTE4OCwiaXNzIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHg5MTVEMWE0MEI5YjFhZDUxZkYzODMzODYyNGQwMjlFNzk3OWE5NEI1In0.HKfCRzBHM4z5-8uI2Dol2bA3wtl6Zew1js5k6tasXc3b7J218UbydqYxNd4-jrmkt-jyVW5jjLWEhdslhi4f0A",
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQXZnTW9udGhseVJlc3QiXSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6ImRpZDpldGhyOnJzazoweDZhMzAzNWVjMzEzN2JlZWI2Nzg5ZmZhOTA4OThjY2FkNWNkMDZmNzk7aWQ9ZTNhODMxMTYtYzIyNi00M2FiLWFiMjktYTY0N2ExZDJjYjVlO3ZlcnNpb249MS4wIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImF2Z01vbnRobHlSZXN0IjowfX0sInN1YiI6ImRpZDpldGhyOnJzazp0ZXN0bmV0OjB4RjlBOWVBNzkzNEZFOUZEMTE3QjVmODMzN0RiYjI4ZjhiRjRGRTA5MCIsIm5iZiI6MTY1MTUxNTE4OCwiaXNzIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHg5MTVEMWE0MEI5YjFhZDUxZkYzODMzODYyNGQwMjlFNzk3OWE5NEI1In0.HKfCRzBHM4z5-8uI2Dol2bA3wtl6Zew1js5k6tasXc3b7J218UbydqYxNd4-jrmkt-jyVW5jjLWEhdslhi4f0A",
  ],
  bankCredentials: [
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "Age"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=031c9883-0f94-4d26-8fbd-c73aef407ce5;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          age: 53,
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "HasKYC"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=c17df34e-104a-4eff-85e1-cc45e659b2dc;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          hasKYC: true,
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "Citizenship"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=23730a1d-8f25-4c6a-b527-7f8ad901eea9;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          citizenship: "FL",
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "AvgMonthlyIncome"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=26c334d5-ee07-4dae-a789-05e3a6277d71;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          avgMonthlyIncome: 156,
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "AvgMonthlyRest"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=e3a83116-c226-43ab-ab29-a647a1d2cb5e;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          avgMonthlyRest: 0,
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "AvgMonthlyRest"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=e3a83116-c226-43ab-ab29-a647a1d2cb5e;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          avgMonthlyRest: 0,
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
  ],
  finances: {
    income: "1000",
    other: "1000",
    unofficial: "1000",
    expenses: "1000",
    dependants: "2",
  },
  goals: [
    {
      goalId: "8c4acbbe-05a7-4b41-9bda-015381faa75d",
      goalType: "new car",
      loanDuration: "2",
      amountSaved: "1000",
      amountNeeded: "1000",
      isAchieved: false,
      offer: {
        found: true,
        pondAddress: "0xf1216e3f66d44895e275EeF1f846265ca488D064",
        amount: "215.0",
        annualInterestRate: 0.03,
        approved: true,
        cashBackRate: 0.02,
        disbursmentFee: 4,
        duration: 2,
        installmentAmount: "108.0375",
        totalAmount: "216.075",
        totalInterest: "1.075",
      },
      loan: {
        pondAddress: "",
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
// Reducer
export const initialState = {
  userId: "",
  walletId: "",
  chainId: "",
  balance: 0,
  bankUserId: "",
  termsAccepted: false,
  growrTermsAccepted: false,
  verifiableCredentials: [],
  bankCredentials: [],
  finances: {
    income: "",
    other: "",
    unofficial: "",
    expenses: "",
    dependants: "",
  },
  goals: [
    {
      goalId: "",
      goalType: "",
      loanDuration: "",
      amountSaved: "",
      amountNeeded: "",
      isAchieved: false,
      offer: {
        found: undefined,
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
        pondAddress: "",
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
    case SET_WALLET_AND_CHAIN:
      console.log("SET_WALLET_AND_CHAIN", query);
      return {
        ...state,
        walletId: query.walletId,
        chainId: query.chainId,
      };
    case SET_BALANCE:
      console.log("SET_BALANCE", query);
      return {
        ...state,
        balance: query,
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
    case SET_VERIFIABLE_CREDENTIALS:
      return {
        ...state,
        // TODO: Handle add/replace
        verifiableCredentials: query,
      };
    case SET_BANK_CREDENTIALS:
      return {
        ...state,
        // TODO: Handle add/replace
        bankCredentials: query,
      };
    case SET_FINANCES:
      return {
        ...state,
        finances: {
          ...state.finances,
          ...query,
        },
      };
    case SET_GOAL:
      return {
        ...state,
        goals: [query],
      };
    case SET_OFFER:
      // console.log("SET_OFFER", query.goalId, query.offer);
      return {
        ...state,
        goals: state.goals.map((goal) => {
          if (goal.goalId !== query.goalId) return goal;

          // We found the goal => update the offer
          // console.log("update goal", goal.goalId);
          const newGoal = {
            ...goal,
            offer: query.offer,
          };
          // console.log("newGoal", newGoal);
          return newGoal;
        }),
      };
    case SET_LOAN:
      // console.log("SET_LOAN", query.goalId, query.loan);
      return {
        ...state,
        goals: state.goals.map((goal) => {
          if (goal.goalId !== query.goalId) return goal;

          // We found the goal => update the loan
          const newGoal = {
            ...goal,
            loan: query.loan,
          };
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
