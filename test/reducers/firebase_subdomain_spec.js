import expect from 'expect'

import reducer from '../../src/reducers/firebase_subdomain'
import { RESET } from '../../src/actions'

describe('firebase_subdomain reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual('')
  })

  it('should apply the new subdomain on RESET', () => {
    expect(reducer(undefined, {
      type: RESET,
      state: { firebase_subdomain: 'something-123' },
    })).toEqual('something-123')
  })
})
