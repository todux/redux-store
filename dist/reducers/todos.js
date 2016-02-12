'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = todos;

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _lodash = require('lodash');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function todos() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _actions.RESET:
      return action.state.todos;
    case _actions.IMPORT_TODO:
    case _actions.CREATE_TODO:
      if (!action.todo.text) return state;else return [(0, _lodash.merge)({}, {
        id: _shortid2.default.generate(),
        text: '',
        completed: false,
        firebase_key: ''
      }, action.todo)].concat(state);

    case _actions.UPDATE_TODO:
      return state.map(function (todo) {
        if (todo.id !== action.id) return todo;else return (0, _lodash.merge)({}, todo, {
          text: action.update.text,
          completed: action.update.completed,
          firebase_key: action.update.firebase_key
        });
      });

    case _actions.DELETE_TODO:
      if (!action.id) return state;else return state.filter(function (todo) {
        return todo.id !== action.id;
      });

    default:
      return state;
  }
}