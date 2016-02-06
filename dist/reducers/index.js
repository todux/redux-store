'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _todos = require('./todos');

var _todos2 = _interopRequireDefault(_todos);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _firebase_subdomain = require('./firebase_subdomain');

var _firebase_subdomain2 = _interopRequireDefault(_firebase_subdomain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  todos: _todos2.default,
  filter: _filter2.default,
  firebase_subdomain: _firebase_subdomain2.default
});