import expect from 'expect'

import reducer from '../../src/reducers/todos'
import {
  UPDATE_TODO,
  CREATE_TODO,
  DELETE_TODO
} from '../../src/actions'

describe('todos reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  })

  describe('UPDATE_TODO', () => {

    it('should update fields of the specified todo', () => {

      const state = [{
        id: 2,
        text: 'This is a todo',
        completed: true,
      },{
        id: 5,
        text: 'Yet another todo',
        completed: false,
      }]

      expect(
        reducer(state, {
          type: UPDATE_TODO,
          id: 5,
          update: {
            text: 'new todo input',
            completed: true,
          }
        })
      ).toEqual([{
        id: 2,
        text: 'This is a todo',
        completed: true,
      },{
        id: 5,
        text: 'new todo input',
        completed: true,
      }])
    })

    it('should not change completed field if not specified', () => {

      const state = [{
        id: 2,
        text: 'This is a todo',
        completed: true,
      },{
        id: 5,
        text: 'Yet another todo',
        completed: false,
      }]

      expect(
        reducer(state, {
          type: UPDATE_TODO,
          id: 2,
          update: { text: 'new todo input' }
        })
      ).toEqual([{
        id: 2,
        text: 'new todo input',
        completed: true,
      },{
        id: 5,
        text: 'Yet another todo',
        completed: false,
      }])
    })

    it('should not change text field if not specified', () => {

      const state = [{
        id: 2,
        text: 'This is a todo',
        completed: true,
      },{
        id: 5,
        text: 'Yet another todo',
        completed: false,
      }]

      expect(
        reducer(state, {
          type: UPDATE_TODO,
          id: 2,
          update: { completed: true }
        })
      ).toEqual([{
        id: 2,
        text: 'This is a todo',
        completed: true,
      },{
        id: 5,
        text: 'Yet another todo',
        completed: false,
      }])
    })
  })

  describe('CREATE_TODO', () => {
    it('should prepend a new todo', () => {
      const state = [{
        id: 2,
        text: 'This is a todo',
        completed: true,
      },{
        id: 5,
        text: 'Yet another todo',
        completed: false,
      }]

      const new_state = reducer(state, {
        type: CREATE_TODO,
        todo: { text: 'This is a new todo!' },
      })

      expect(new_state.length).toBe(state.length + 1)

      const new_todo = new_state[0]
      expect(new_todo.text).toBe('This is a new todo!')
      expect(new_todo.completed).toBe(false)
      expect(new_todo.hasOwnProperty('id')).toBe(true)
    })

    it('should return the state if empty text presented', () => {
      const state = [{
        id: 2,
        text: 'This is a todo',
        completed: true,
      },{
        id: 5,
        text: 'Yet another todo',
        completed: false,
      }]

      expect(
        reducer(state, {
          type: CREATE_TODO,
          todo: { text: '' }
        })
      ).toBe(state)
    })
  })

  describe('DELETE_TODO', () => {
    it('should remove a specified todo', () => {
      const state = [{
        id: 2,
        text: 'This is a todo',
        completed: true,
      },{
        id: 5,
        text: 'Yet another todo',
        completed: false,
      }]

      const new_state = reducer(state, {
        type: DELETE_TODO,
        id: 2
      })

      expect(new_state.length).toBe(state.length - 1)
    })
  })
})
