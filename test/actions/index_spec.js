import expect from 'expect'

import * as actions from '../../src/actions'

describe('actions', () => {

  describe('initialize', () => {
    it.skip('should use passed callback to generate initial state', () => {
    })

    it.skip('should set up firebase listeners', () => {
    })
  })

  describe('init', () => {
    it('should reset the state', () => {
      const newState = {
        todos: [],
        filter: actions.Filters.ALL,
        firebaes_subdomain: 'something-123',
      }

      expect(actions.init(newState))
        .toEqual({ type: actions.INIT, state: newState })
    })
  })

  describe('importTodo', () => {
    it('should produce an action to import an existing todo', () => {
      const todo = {
        id: 'thisisanid',
        text: 'Todo Text',
        completed: true,
      }

      expect(actions.importTodo(todo))
        .toEqual({type: actions.IMPORT_TODO, todo})
    })
  })

  describe('createTodo', () => {
    it.skip('should dispatch a CREATE_TODO action', () => {
    })

    it.skip('should send new todo to firebase and update firebase_key', () => {
    })
  })

  describe('updateTodo', () => {
    it.skip('should dispatch a UPDATE_TODO action', () => {
    })

    context('when firebase key is present', () => {
      it.skip('should send updated values to firebase', () => {
      })
    })
  })

  describe('deleteTodo', () => {
    context('when valid todo id provided', () => {
      it.skip('should dispatch a DELETE_TODO action', () => {
      })

      it.skip('should send removal to firebase', () => {
      })
    })

    context('when invalid todo id provided', () => {
      it('should not dispatch any actions', () => {
      })
    })
  })

  describe('updateFilter', () => {
    it('should produce an action to set the current filter', () => {
      const expectedAction = {
        type: actions.UPDATE_FILTER,
        filter: actions.Filters.COMPLETED,
      }

      expect(actions.updateFilter(actions.Filters.COMPLETED)).toEqual(expectedAction)
    })
  })
})
