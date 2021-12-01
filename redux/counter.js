// Actions
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const RESET = 'RESET'

// Action Creators
export const incrementCount = () => ({ type: INCREMENT })

export const decrementCount = () => ({ type: DECREMENT })

export const resetCount = () => ({ type: RESET })

// Reducer
const counterReducer = (state = 1, { type }) => {
  switch (type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    case RESET:
      return 0
    default:
      return state
  }
}

export default counterReducer
