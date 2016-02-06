'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = firebase_subdomain;

var _actions = require('../actions');

function firebase_subdomain() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _actions.INIT:
      return action.state.firebase_subdomain;

    case _actions.UPDATE_FIREBASE_SUBDOMAIN:
      return action.firebase_subdomain;

    default:
      return state;
  }
}