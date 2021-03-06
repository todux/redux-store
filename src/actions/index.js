import { find } from 'lodash'

import getFirebaseRef from '../lib/firebase'

export const RESET = 'RESET'
export const IMPORT_TODO = 'CREATE_TODO'
export const CREATE_TODO = 'CREATE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const UPDATE_FILTER = 'UPDATE_FILTER'

export const Filters = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
}

export function initialize(getInitialState) {
  getInitialState = getInitialState || ((cb) => { cb() })

  return (dispatch, getState) => {
    getInitialState((initialState) => {

      if (initialState) {
        dispatch(reset(initialState))
      }

      const todosRef = getFirebaseRef(getState().firebase_subdomain)
      if (todosRef) {
        todosRef.on('child_added', (snapshot) => {
          if(!find(getState().todos, { id: snapshot.val().id })) {
            dispatch(importTodo(snapshot.val()))
          }
        })

        todosRef.on('child_changed', (snapshot) => {
          dispatch(updateTodo(snapshot.val().id, snapshot.val()))
        })

        todosRef.on('child_removed', (snapshot) => {
          dispatch(deleteTodo(snapshot.val().id))
        })
      }
    })
  }
}

export function reset(state) {
  return { type: RESET, state }
}

export function importTodo(existingTodo) {
  return { type: IMPORT_TODO, todo: existingTodo }
}

export function createTodo(todo) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_TODO, todo })

    const todosRef = getFirebaseRef(getState().firebase_subdomain)
    if (todosRef) {
      todo = getState().todos[0]
      const todoRef = todosRef.push(todo)
      dispatch(updateTodo(todo.id, { firebase_key: todoRef.key() }))
    }
  }
}

export function updateTodo(id, update) {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_TODO, id, update })
    const todosRef = getFirebaseRef(getState().firebase_subdomain)
    if (todosRef) {
      const updatedTodo = find(getState().todos, {id})
      todosRef.child(updatedTodo.firebase_key).update({
        text: updatedTodo.text,
        completed: updatedTodo.completed,
        firebase_key: updatedTodo.firebase_key,
      })
    }
  }
}

export function deleteTodo(id) {
  return (dispatch, getState) => {
    const todo = find(getState().todos, {id})
    if (!todo) return;
    dispatch({ type: DELETE_TODO, id })

    const todosRef = getFirebaseRef(getState().firebase_subdomain)
    if (todosRef) {
      todosRef.child(todo.firebase_key).remove()
    }
  }
}

export function updateFilter(filter) {
  return { type: UPDATE_FILTER, filter }
}
