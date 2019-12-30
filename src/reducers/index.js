import { combineReducers } from 'redux'
import account from './account'
import plans from './plans'
import groups from './groups'
import group from './group'

const rootReducer = combineReducers({
  account,
  plans,
  groups,
  group
})

export default rootReducer
