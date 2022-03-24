import { combineReducers } from 'redux'
import steps from './steps'
import user from './user'
// import { HYDRATE } from 'next-redux-wrapper'

// const hydrateReducer = (state = {tick: 'init'}, action) => {
//   switch (action.type) {
//     case HYDRATE:
//       return {...state, ...action.payload};
//     default:
//       return state;
//   }
// };

const reducers = combineReducers({
  // hydrateReducer,
  steps,
  user
})

export default reducers
