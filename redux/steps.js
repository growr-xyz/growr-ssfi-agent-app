// Actions
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

// Action Creators
export const incrementStep = () => ({ type: INCREMENT })
export const decrementStep = () => ({ type: DECREMENT })

// Reducer
export const initialState = {
  step: 1,
  total: 5
}

const stepsReducer = (state = initialState, action) => {
  const { step, total } = state

  switch (action.type) {
    case INCREMENT:
      if (step >= total) {
        return state
      }
      return {
        ...state,
        step: step + 1
      }

    case DECREMENT:
      if (step < 2) {
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
