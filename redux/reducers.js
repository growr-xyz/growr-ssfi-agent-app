import { combineReducers } from 'redux'
import counter from './counter'
import wallet from './wallet'

const reducers = combineReducers({
  counter,
  wallet
})

export default reducers
