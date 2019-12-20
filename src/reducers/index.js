import { combineReducers } from 'redux'
import account from './account'
import plans from './plans'
import groups from './groups'

const rootReducer = combineReducers({
  account,
  plans,
  groups
})

export default rootReducer
