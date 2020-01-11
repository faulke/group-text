import { combineReducers } from 'redux'
import account from './account'
import plans from './plans'
import groups from './groups'
import group from './group'
import notification from './notification'
import contacts from './contacts'

const rootReducer = combineReducers({
  account,
  plans,
  groups,
  group,
  notification,
  contacts
})

export default rootReducer
