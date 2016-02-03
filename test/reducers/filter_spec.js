import expect from 'expect'

import reducer from '../../src/reducers/filter'
import { UPDATE_FILTER } from '../../src/actions'

describe('filter reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual('ALL')
  })

  it('should allow ACTIVE filter', () => {
    expect(
      reducer(undefined, {
        type: UPDATE_FILTER,
        filter: 'ACTIVE',
      })
    ).toEqual('ACTIVE')
  })

  it('should allow COMPLETED filter', () => {
    expect(
      reducer(undefined, {
        type: UPDATE_FILTER,
        filter: 'COMPLETED',
      })
    ).toEqual('COMPLETED')
  })

  it('should not apply other filters', () => {
    expect(
      reducer(undefined, {
        type: UPDATE_FILTER,
        filter: 'NOT A REAL FILTER'
      })
    ).toEqual('ALL')
  })
})
