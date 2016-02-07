import expect from 'expect'

import reducer from '../../src/reducers/firebase_subdomain'
import { INIT } from '../../src/actions'

describe('firebase_subdomain reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual('')
  })

  it('should apply the new subdomain on INIT', () => {
    expect(reducer(undefined, {
      type: INIT,
      state: { firebase_subdomain: 'something-123' },
    })).toEqual('something-123')
  })
})
