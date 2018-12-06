"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = exports.TableReducer = void 0;

var _reducer = _interopRequireDefault(require("./reducer"));

var _table = _interopRequireDefault(require("./table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableReducer = _reducer.default;
exports.TableReducer = TableReducer;
var Table = _table.default;
exports.Table = Table;