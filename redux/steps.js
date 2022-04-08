// Actions
export const INCREMENT_STEP = "INCREMENT_STEP";
export const DECREMENT_STEP = "DECREMENT_STEP";
export const GO_TO = "GO_TO";

// Action Creators
export const incrementStep = () => ({ type: INCREMENT_STEP });
export const decrementStep = () => ({ type: DECREMENT_STEP });
export const goToStep = (query) => ({ type: GO_TO, query });

// Reducer
export const initialState = {
  step: 0,
  total: 5,
};

const stepsReducer = (state = initialState, { type, query }) => {
  const { step, total } = state;

  switch (type) {
    case INCREMENT_STEP:
      if (step >= total) {
        return state;
      }
      return {
        ...state,
        step: step + 1,
      };

    case DECREMENT_STEP:
      if (step < 1) {
        return state;
      }
      return {
        ...state,
        step: step - 1,
      };
    case GO_TO:
      return {
        ...state,
        step: query,
      };

    default:
      return state;
  }
};

export default stepsReducer;
