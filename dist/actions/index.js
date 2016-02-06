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

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFirebase(state) {
  if (!state.firebase_subdomain) return false;
  return new _firebase2.default('https://' + state.firebase_subdomain + '.firebaseio.com/todos');
}

var INIT = exports.INIT = 'INIT';
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

      var todosRef = getFirebase(getState());
      if (todosRef) {
        todosRef.on('child_added', function (snapshot) {
          if (!(0, _lodash.find)(getState().todos, { id: snapshot.val().id })) {
            dispatch(importTodo(snapshot.val()));
          }
        });

        todosRef.on('child_changed', function (snapshot) {
          dispatch(updateTodo(snapshot.val().id, snapshot.val()));
        });

        todosRef.on('child_removed', function (snapshot) {
          dispatch(deleteTodo(snapshot.val().id));
        });
      }
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

    var todosRef = getFirebase(getState());
    if (todosRef) {
      todo = getState().todos[0];
      var todoRef = todosRef.push(todo);
      dispatch(updateTodo(todo.id, { firebase_key: todoRef.key() }));
    }
  };
}

function updateTodo(id, update) {
  return function (dispatch, getState) {
    dispatch({ type: UPDATE_TODO, id: id, update: update });

    var todosRef = getFirebase(getState());
    if (todosRef) {
      var updatedTodo = (0, _lodash.find)(getState().todos, { id: id });
      todosRef.child(updatedTodo.firebase_key).update({
        text: updatedTodo.text,
        completed: updatedTodo.completed,
        firebase_key: updatedTodo.firebase_key
      });
    }
  };
}

function deleteTodo(id) {
  return function (dispatch, getState) {
    var todo = (0, _lodash.find)(getState().todos, { id: id });
    if (!todo) return;
    dispatch({ type: DELETE_TODO, id: id });

    var todosRef = getFirebase(getState());
    if (todosRef) {
      todosRef.child(todo.firebase_key).remove();
    }
  };
}

function updateFilter(filter) {
  return { type: UPDATE_FILTER, filter: filter };
}