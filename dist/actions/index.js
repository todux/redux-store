'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filters = exports.UPDATE_FILTER = exports.DELETE_TODO = exports.UPDATE_TODO = exports.CREATE_TODO = exports.IMPORT_TODO = exports.INIT = undefined;
exports.initialize = initialize;
exports.init = init;
exports.importTodo = importTodo;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
exports.updateFilter = updateFilter;

var _lodash = require('lodash');

//const todosRef = new Firebase("https://shining-inferno-825.firebaseio.com/todos")

var INIT = exports.INIT = 'INIT'; //import Firebase from 'firebase'

var IMPORT_TODO = exports.IMPORT_TODO = 'CREATE_TODO';
var CREATE_TODO = exports.CREATE_TODO = 'CREATE_TODO';
var UPDATE_TODO = exports.UPDATE_TODO = 'UPDATE_TODO';
var DELETE_TODO = exports.DELETE_TODO = 'DELETE_TODO';
var UPDATE_FILTER = exports.UPDATE_FILTER = 'UPDATE_FILTER';

var Filters = exports.Filters = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
};

function initialize(getInitialState) {
  getInitialState = getInitialState || function (cb) {
    cb();
  };

  return function (dispatch, getState) {
    getInitialState(function (initialState) {

      if (initialState) {
        dispatch(init(initialState));
      }

      //todosRef.on('child_added', (snapshot) => {
      //  if(!find(getState().todos, { id: snapshot.val().id })) {
      //    dispatch(importTodo(snapshot.val()))
      //  }
      //})

      //todosRef.on('child_changed', (snapshot) => {
      //  dispatch(updateTodo(snapshot.val().id, snapshot.val()))
      //})

      //todosRef.on('child_removed', (snapshot) => {
      //  dispatch(deleteTodo(snapshot.val().id))
      //})
    });
  };
}

function init(state) {
  return { type: INIT, state: state };
}

function importTodo(existingTodo) {
  return { type: IMPORT_TODO, todo: existingTodo };
}

function createTodo(todo) {
  return function (dispatch, getState) {
    dispatch({ type: CREATE_TODO, todo: todo });

    //todo = getState().todos[0]
    //const todoRef = todosRef.push(todo)
    //dispatch(updateTodo(todo.id, { firebase_key: todoRef.key() }))
    //return todoRef
  };
}

function updateTodo(id, update) {
  return function (dispatch, getState) {
    dispatch({ type: UPDATE_TODO, id: id, update: update });
    //const updatedTodo = find(getState().todos, {id})
    //return todosRef.child(updatedTodo.firebase_key).update({
    //  text: updatedTodo.text,
    //  completed: updatedTodo.completed,
    //  firebase_key: updatedTodo.firebase_key,
    //})
  };
}

function deleteTodo(id) {
  return function (dispatch, getState) {
    var todo = (0, _lodash.find)(getState().todos, { id: id });
    if (!todo) return;
    dispatch({ type: DELETE_TODO, id: id });
    //todosRef.child(todo.firebase_key).remove()
  };
}

function updateFilter(filter) {
  return { type: UPDATE_FILTER, filter: filter };
}