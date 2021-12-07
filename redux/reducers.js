import { combineReducers } from 'redux'
import steps from './steps'
import user from './user'

const reducers = combineReducers({
  steps,
  user
})

export default reducers
