"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.initializeTable = initializeTable;
exports.insertData = insertData;
exports.updateData = updateData;
exports.updateAccessors = updateAccessors;
exports.updateSearch = updateSearch;
exports.searching = searching;
exports.clearSearch = clearSearch;
exports.changeSort = changeSort;
exports.filterCheck = filterCheck;
exports.changePage = changePage;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INSERT_DATA = 'table/INSERT_DATA';
var UPDATE_DATA = 'table/UPDATE_DATA';
var UPDATE_INSERT_ACCESSORS = 'table/UPDATE_INSERT_ACCESSORS';
var INITIALIZE_TABLE = 'table/INITIALIZE_TABLE';
var CHANGE_SORT = 'table/CHANGE_SORT';
var SEARCHING = 'table/SEARCHING';
var CLEAR_SEARCH = 'table/CLEAR_SEARCH';
var CHANGE_SEARCH = 'table/CHANGE_SEARCH';
var FILTER_CHECKBOX = 'table/FILTER_CHECKBOX';
var SORTED = 'table/SORTED';
var CHANGE_PAGE = 'table/CHANGE_PAGE';
var initialState = {};
var individualState = {
  page: 0,
  pages: 0,
  items: [],
  keys: [],
  sort: function sort() {
    return 0;
  },
  searchText: '',
  search: function search() {
    return true;
  },
  _items: []
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case INITIALIZE_TABLE:
      return Object.assign({}, state, _defineProperty({}, action.table, individualState));

    case CHANGE_PAGE:
      return Object.assign({}, state, _defineProperty({}, action.table, data(state[action.table], action)));

    case INSERT_DATA:
    case UPDATE_DATA:
      return Object.assign({}, state, _defineProperty({}, action.table, data(state[action.table], action)));

    case UPDATE_INSERT_ACCESSORS:
      return Object.assign({}, state, _defineProperty({}, action.table, data(state[action.table], action)));

    case CLEAR_SEARCH:
    case SEARCHING:
    case CHANGE_SEARCH:
    case CHANGE_SORT:
      return Object.assign({}, state, _defineProperty({}, action.table, data(state[action.table], action)));

    case SORTED:
      return Object.assign({}, state, _defineProperty({}, action.table, data(state[action.table], action)));

    case FILTER_CHECKBOX:
      return Object.assign({}, state, _defineProperty({}, action.table, data(state[action.table], action)));

    default:
      return state;
  }
}

function data(state, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return Object.assign({}, state, {
        page: action.page
      });

    case INSERT_DATA:
      return Object.assign({}, state, {
        items: action.data,
        _items: action.data,
        pages: Math.ceil(action.data.length / 12)
      });

    case UPDATE_DATA:
      return Object.assign({}, state, {
        _items: action.data
      });

    case UPDATE_INSERT_ACCESSORS:
      return Object.assign({}, state, {
        keys: action.data
      });

    case SORTED:
      return Object.assign({}, state, {
        items: action.data,
        page: 0,
        pages: Math.ceil(action.data.length / 12)
      });

    case SEARCHING:
      return Object.assign({}, state, {
        items: action.data,
        searchText: action.searchText
      });

    case CLEAR_SEARCH:
      return Object.assign({}, state, {
        items: action.data,
        searchText: ''
      });

    case CHANGE_SEARCH:
      return Object.assign({}, state, {
        search: action.search
      });

    case CHANGE_SORT:
      return Object.assign({}, state, {
        sort: action.sort,
        keys: state.keys.map(function (_key) {
          if (_key.key === action.key) {
            _key.active = true;
            _key.asc = action.asc;
          } else {
            _key.active = false;
            _key.asc = null;
          }

          return _key;
        })
      });

    case FILTER_CHECKBOX:
      return Object.assign({}, state, {
        keys: state.keys.map(function (_key) {
          if (_key.key === action.key) {
            _key.checked = action.checked;
          }

          return _key;
        })
      });

    default:
      return state;
  }
}

function initializeTable(table) {
  return {
    type: INITIALIZE_TABLE,
    table: table
  };
}

function insertData(table, data) {
  return {
    type: INSERT_DATA,
    table: table,
    data: data
  };
}

function updateData(table, data) {
  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dispatch, getState) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch({
                type: UPDATE_DATA,
                table: table,
                data: data
              });
              dispatch(filtering(table));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

function updateAccessors(table, data) {
  return {
    type: UPDATE_INSERT_ACCESSORS,
    table: table,
    data: data
  };
}

function updateSearch(tableKey, searchFn) {
  return {
    type: CHANGE_SEARCH,
    table: tableKey,
    search: searchFn
  };
}

function searching(tableKey, searchText) {
  return function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(dispatch, getState) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch({
                type: SEARCHING,
                table: tableKey,
                searchText: searchText
              });
              dispatch(filtering(tableKey));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
}

function clearSearch(tableKey) {
  return function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(dispatch, getState) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch({
                type: CLEAR_SEARCH,
                table: tableKey
              });
              dispatch(filtering(tableKey));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();
}

function changeSort(tableKey, key, asc, sortFn) {
  return function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(dispatch, getState) {
      var table, state, items, data;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              table = getState().table;
              state = table[tableKey];
              items = state.items;
              data = _toConsumableArray(items);
              dispatch({
                type: CHANGE_SORT,
                table: tableKey,
                key: key,
                asc: asc,
                sort: sortFn
              });
              dispatch(sorting(tableKey, data, sortFn));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();
}

function sorting(table, data, sort) {
  data = data.sort(sort);
  return {
    type: SORTED,
    data: data,
    table: table
  };
}

function filterCheck(tableKey, key, checked) {
  return function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(dispatch, getState) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              dispatch({
                type: FILTER_CHECKBOX,
                table: tableKey,
                key: key,
                checked: checked
              });
              return _context5.abrupt("return", dispatch(filtering(tableKey)));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();
}

function filtering(tableKey) {
  return function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(dispatch, getState) {
      var table, state, _items, sort, keys, search, searchText, data, _keys, _loop, i;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              table = getState().table;
              state = table[tableKey];
              _items = state._items, sort = state.sort, keys = state.keys, search = state.search, searchText = state.searchText;
              data = _toConsumableArray(_items);
              _keys = keys.filter(function (k) {
                return k.checked;
              });

              _loop = function _loop(i) {
                var key = _keys[i];
                data = data.filter(function (f) {
                  return f[key.key] === true;
                });
              };

              for (i = 0; i < _keys.length; i++) {
                _loop(i);
              }

              data = data.filter(function (item) {
                return search(item, searchText);
              });
              return _context6.abrupt("return", dispatch(sorting(tableKey, data, sort)));

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();
}

function changePage(table, page) {
  page = Math.max(0, page);
  return {
    type: CHANGE_PAGE,
    table: table,
    page: page
  };
}