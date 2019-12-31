import { combineReducers } from 'redux'
import account from './account'
import plans from './plans'
import groups from './groups'
import group from './group'
import notification from './notification'

const rootReducer = combineReducers({
  account,
  plans,
  groups,
  group,
  notification
})

export default rootReducer
