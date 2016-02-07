import { INIT, UPDATE_FIREBASE_SUBDOMAIN } from '../actions'

export default function firebase_subdomain(state = '', action) {
  switch (action.type) {
    case INIT:
      return action.state.firebase_subdomain

    default:
      return state
  }
}
