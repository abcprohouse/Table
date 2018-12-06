"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reducer = require("./reducer");

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Table).call(this, props));
    _this.state = {
      table: props.tableKey
    };
    _this.changeSort = _this.changeSort.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.searching = _this.searching.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clearSearch = _this.clearSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.changePage = _this.changePage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.changeFilterCheckBox = _this.changeFilterCheckBox.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Table, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          accessors = _this$props.accessors;
      var table = this.state.table;

      if (typeof this.props.table === 'undefined') {
        this.props.initializeTable(table);
        this.props.insertData(table, data);
        this.props.updateAccessors(table, accessors);

        if (this.props.search) {
          this.props.updateSearch(table, this.props.search);
        }
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var data = props.data;

      if (data !== this.props.data) {
        var table = this.state.table;
        props.updateData(table, data);
      }
    }
  }, {
    key: "changeSort",
    value: function changeSort(key, asc) {
      var table = this.state.table;
      this.props.changeSort(table, key, asc, function (a, b) {
        if (typeof a[key] === 'string') {
          if (asc) return b[key].localeCompare(a[key]);else return -b[key].localeCompare(a[key]);
        } else if (typeof a[key] === 'number') {
          if (asc) return b[key] - a[key];else return a[key] - b[key];
        }

        return 0;
      });
    }
  }, {
    key: "changeFilterCheckBox",
    value: function changeFilterCheckBox(key, tick) {
      var table = this.state.table;
      this.props.filterCheck(table, key, tick);
    }
  }, {
    key: "searching",
    value: function searching(text) {
      var table = this.state.table;
      this.props.searching(table, text);
    }
  }, {
    key: "changePage",
    value: function changePage(page, pages) {
      var table = this.state.table;
      page = Math.max(0, page);
      page = Math.min(page, pages - 1);
      this.props.changePage(table, page);
    }
  }, {
    key: "clearSearch",
    value: function clearSearch() {
      var table = this.state.table;
      this.props.clearSearch(table);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var changeSort = this.changeSort;
      var changePage = this.changePage;
      var changeFilterCheckBox = this.changeFilterCheckBox;
      var table = this.state.table;
      var rowKey = this.props.rowKey;
      var state = this.props.table;

      if (state) {
        var keys = state.keys,
            items = state.items,
            page = state.page,
            pages = state.pages,
            searchText = state.searchText;
        return _react.default.createElement("div", null, _react.default.createElement("div", {
          className: "my-1"
        }, _react.default.createElement("button", {
          className: "btn btn-sm",
          onClick: function onClick() {
            return changePage(page - 1, pages);
          }
        }, "previous"), _react.default.createElement("span", {
          className: "mx-2"
        }, page + 1, "/", pages), _react.default.createElement("button", {
          className: "btn btn-sm",
          onClick: function onClick() {
            return changePage(page + 1, pages);
          }
        }, "next"), _react.default.createElement("div", {
          className: "float-right"
        }, _react.default.createElement("button", {
          type: "submit",
          onClick: this.clearSearch,
          className: "btn btn-primary"
        }, "Clear")), _react.default.createElement("div", {
          className: "float-right"
        }, _react.default.createElement("input", {
          className: "form-control",
          placeholder: "search",
          onChange: function onChange(e) {
            return _this2.searching(e.target.value);
          },
          value: searchText
        })), _react.default.createElement("div", {
          className: "clearfix"
        })), _react.default.createElement("table", {
          className: "table bg-white"
        }, _react.default.createElement("thead", {
          className: "thead-inverse"
        }, _react.default.createElement("tr", null, keys.map(function (k, i) {
          if (k.checkbox) {
            return _react.default.createElement("th", {
              style: {
                cursor: 'pointer'
              },
              key: i,
              onClick: function onClick() {
                return changeFilterCheckBox(k.key, !k.checked);
              }
            }, _react.default.createElement("div", {
              className: "form-group mb-0"
            }, _react.default.createElement("input", {
              className: "form-check-input",
              type: "checkbox",
              readOnly: true,
              checked: !!k.checked
            }), _react.default.createElement("label", {
              className: "mb-0"
            }, k.title)));
          }

          return _react.default.createElement("th", {
            style: {
              cursor: 'pointer'
            },
            key: i,
            onClick: function onClick() {
              return changeSort(k.key, !k.asc);
            }
          }, k.active ? k.asc ? '<' : '>' : '', k.title);
        }))), _react.default.createElement("tbody", null, items.slice(page * 12, (page + 1) * 12).map(function (i) {
          return _react.default.createElement("tr", {
            key: i[rowKey]
          }, keys.map(function (k, index) {
            if (k.checkbox) {
              return _react.default.createElement("td", {
                key: index
              }, _react.default.createElement("input", {
                type: "checkbox",
                checked: i[k.key],
                readOnly: true
              }));
            }

            if (k.render) {
              return _react.default.createElement("td", {
                key: index
              }, k.render(i));
            }

            return _react.default.createElement("td", {
              key: index
            }, i[k.key]);
          }));
        }))));
      } else {
        return _react.default.createElement("table", null);
      }
    }
  }]);

  return Table;
}(_react.default.Component);

Table = (0, _reactRedux.connect)(function (state, props) {
  return {
    table: state.table[props.tableKey]
  };
}, {
  insertData: _reducer.insertData,
  updateData: _reducer.updateData,
  updateAccessors: _reducer.updateAccessors,
  initializeTable: _reducer.initializeTable,
  changeSort: _reducer.changeSort,
  filterCheck: _reducer.filterCheck,
  changePage: _reducer.changePage,
  updateSearch: _reducer.updateSearch,
  searching: _reducer.searching,
  clearSearch: _reducer.clearSearch
})(Table);
Table.propTypes = {
  data: _propTypes.default.array,
  accessors: _propTypes.default.array,
  tableKey: _propTypes.default.string.isRequired,
  rowKey: _propTypes.default.string,
  search: _propTypes.default.func
};
var _default = Table;
exports.default = _default;