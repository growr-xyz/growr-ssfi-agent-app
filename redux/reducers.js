import { combineReducers } from 'redux'
import steps from './steps'
import wallet from './wallet'

const reducers = combineReducers({
  steps,
  wallet
})

export default reducers
