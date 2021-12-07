// Actions
export const INCREMENT_STEP = 'INCREMENT_STEP'
export const DECREMENT_STEP = 'DECREMENT_STEP'

// Action Creators
export const incrementStep = () => ({ type: INCREMENT_STEP })
export const decrementStep = () => ({ type: DECREMENT_STEP })

// Reducer
export const initialState = {
  step: 0,
  total: 5
}

const stepsReducer = (state = initialState, {type}) => {
  const { step, total } = state

  switch (type) {
    case INCREMENT_STEP:
      if (step >= total) {
        return state
      }
      return {
        ...state,
        step: step + 1
      }

    case DECREMENT_STEP:
      if (step < 1) {
        return state
      }
      return {
        ...state,
        step: step - 1
      }

    default:
      return state
  }
}

export default stepsReducer
