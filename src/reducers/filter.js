import values from 'lodash.values'

import { INIT, FILTER, Filters } from '../actions'

export default function filter(state = 'ALL', action) {
  if (action.type === FILTER && filterIsValid(action.filter)) {
    return action.filter
  }

  if (action.type === INIT && filterIsValid(action.filter)) {
    return action.state.filter
  }

  return state;
}

function filterIsValid(value) {
  return values(Filters).indexOf(value) !== -1
}
