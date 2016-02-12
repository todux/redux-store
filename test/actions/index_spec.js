import proxyquire from 'proxyquire'
import expect, { createSpy, spyOn } from 'expect'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MockFirebase } from 'mockfirebase'

let mockStore = configureStore([thunk])

let firebaseMock;
const actions = proxyquire('../../src/actions', {
  '../lib/firebase': {
    default: (subdomain) => {
      return (firebaseMock = new MockFirebase(subdomain))
    }
  }
})

const defaultState = {
  todos: [],
  filter: actions.Filters.ALL,
  firebase_subdomain: '',
}

describe('actions', () => {

  describe('initialize', () => {
    it('should use passed callback to generate the init action', (done) => {
      const initialState = {
        todos: [{
          id: 'thisisanid',
          text: 'Todo Text',
          completed: true,
          firebase_key: '',
        }],
        filter: actions.Filters.COMPLETED,
        firebase_subdomain: 'something-123',
      }

      const store = mockStore(defaultState, [{
        type: actions.INIT,
        state: initialState
      }], done)

      store.dispatch(actions.initialize((callback) => callback(initialState)))
    })

    it('should convert child_added firebase event to import action', (done) => {
      const newTodo = { id: 'id', text: 'yayaya', completed: false, firebase_key: 'key' }
      const store = mockStore(defaultState, [
        { type: actions.IMPORT_TODO, todo: newTodo }
      ], done)

      store.dispatch(actions.initialize())
      firebaseMock.fakeEvent('child_added', 'key', newTodo)
      firebaseMock.flush()
    })

    it('should convert child_changed firebase event to update action', (done) => {
      const update = { id: 5, text: 'new todo text', completed: false, firebase_key: 'key' }
      const store = mockStore({
        todos: [{
          id: 5,
          text: 'some todo Text',
          completed: false,
          firebase_key: 'key',
        }]
      }, [
        { type: actions.UPDATE_TODO, id: update.id, update }
      ], done)

      store.dispatch(actions.initialize())
      firebaseMock.fakeEvent('child_changed', 'key', update)
      firebaseMock.flush()
    })

    it('should convert child_removed firebase event to delete action', (done) => {
      const removed = { id: 5 }
      const store = mockStore({
        todos: [{
          id: 5,
          text: 'some todo Text',
          completed: false,
          firebase_key: 'key',
        }]
      }, [
        { type: actions.DELETE_TODO, id: removed.id }
      ], done)

      store.dispatch(actions.initialize())
      firebaseMock.fakeEvent('child_removed', 'key', removed)
      firebaseMock.flush()
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
    it('should dispatch a CREATE_TODO action and update firebase_key', (done) => {
      const newTodo = { text: 'A new Todo' }
      const store = mockStore({
        todos: [{
          id: 5,
          text: 'some todo Text',
          completed: false,
          firebase_key: 'key',
        }]
      }, [
        { type: actions.CREATE_TODO, todo: newTodo },
        (action) => {
          expect(action.type).toEqual(actions.UPDATE_TODO)
          expect(action.id).toExist()
          expect(action.update).toExist()
          expect(action.update.firebase_key).toExist()
        }
      ], done)

      store.dispatch(actions.createTodo(newTodo))
    })
  })

  describe('updateTodo', () => {
    it('should dispatch a UPDATE_TODO action', () => {
      const store = mockStore({
        todos: [{
          id: 5,
          text: 'some todo Text',
          completed: false,
          firebase_key: 'key',
        }]
      }, [
        { type: actions.UPDATE_TODO, id: 5, update: { text: 'new' } }
      ])

      store.dispatch(actions.updateTodo(5, { text: 'new' }))
    })
  })

  describe('deleteTodo', () => {
    context('when valid todo id provided', () => {
      it('should dispatch a DELETE_TODO action', (done) => {
        const store = mockStore({
          todos: [{
            id: 5,
            text: 'some todo Text',
            completed: false,
            firebase_key: 'key',
          }]
        }, [
          { type: actions.DELETE_TODO, id: 5 }
        ], done)

        store.dispatch(actions.deleteTodo(5))
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
