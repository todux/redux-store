import expect from 'expect'

import * as actions from '../../src/actions'

describe('actions', () => {
  describe('createTodo', () => {
    it.skip('should produce an action to create a todo', () => {
      const newTodo = { text: 'Todo Text' }
      const expectedAction = { type: actions.CREATE_TODO, newTodo }

      expect(actions.createTodo(newTodo)).toEqual(expectedAction)
    })
  })

  describe('updateTodo', () => {
    it.skip('should produce an action to update a todo', () => {
      const id = 1
      const update = { text: 'New Todo Text', completed: false }
      const expectedAction = {
        type: actions.UPDATE_TODO,
        id,
        update,
      }

      expect(actions.updateTodo(id, update)).toEqual(expectedAction)
    })
  })

  describe('deleteTodo', () => {
    it.skip('should produce an action to delete a todo', () => {
      const id = 1
      const expectedAction = {
        type: actions.DELETE_TODO,
        id,
      }

      expect(actions.deleteTodo(id)).toEqual(expectedAction)
    })
  })

  describe('filter', () => {
    it('should produce an action to set the current filter', () => {
      const expectedAction = {
        type: actions.FILTER,
        filter: actions.Filters.COMPLETED,
      }

      expect(actions.filter(actions.Filters.COMPLETED)).toEqual(expectedAction)
    })
  })
})

