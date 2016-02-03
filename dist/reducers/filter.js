'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _lodash = require('lodash');

var _actions = require('../actions');

function filter() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'ALL' : arguments[0];
  var action = arguments[1];

  if (action.type === _actions.UPDATE_FILTER && filterIsValid(action.filter)) {
    return action.filter;
  }

  if (action.type === _actions.INIT && filterIsValid(action.filter)) {
    return action.state.filter;
  }

  return state;
}

function filterIsValid(value) {
  return (0, _lodash.values)(_actions.Filters).indexOf(value) !== -1;
}