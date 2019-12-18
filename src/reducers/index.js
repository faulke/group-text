import { combineReducers } from 'redux'
import account from './account'
import plans from './plans'

const rootReducer = combineReducers({
  account,
  plans
})

export default rootReducer
