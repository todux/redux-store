import shortid from 'shortid'
import merge from 'lodash.merge'

import {
  INIT,
  IMPORT_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from '../actions'

export default function todos(state = [], action) {
  switch (action.type) {
    case INIT:
      return action.state.todos
    case IMPORT_TODO:
    case CREATE_TODO:
      if (!action.todo.text) return state
      else return [merge({}, {
        id: shortid.generate(),
        text: '',
        completed: false,
        firebase_key: '',
      }, action.todo)].concat(state)

    case UPDATE_TODO:
      return state.map((todo) => {
        if (todo.id !== action.id) return todo
        else return merge({}, todo, {
          text: action.update.text,
          completed: action.update.completed,
          firebase_key: action.update.firebase_key,
        })
      })

    case DELETE_TODO:
      if (!action.id) return state
      else return state.filter((todo) => todo.id !== action.id )

    default:
      return state
  }
}
