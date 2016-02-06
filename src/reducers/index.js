import { combineReducers } from 'redux'

import todos from './todos'
import filter from './filter'
import filter from './firebase_subdomain'

export default combineReducers({
  todos,
  filter,
  firebase_subdomain
})
