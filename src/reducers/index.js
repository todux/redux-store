import { combineReducers } from 'redux'

import todos from './todos'
import filter from './filter'
import firebase_subdomain from './firebase_subdomain'

export default combineReducers({
  todos,
  filter,
  firebase_subdomain
})
