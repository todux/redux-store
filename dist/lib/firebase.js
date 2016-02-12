'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (subdomain) {
  if (subdomain) return new _firebase2.default('https://' + subdomain + '.firebaseio.com/todos');else return false;
};

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }