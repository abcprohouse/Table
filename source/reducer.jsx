// widgets.js
const INSERT_DATA   = 'table/INSERT_DATA';
const UPDATE_DATA   = 'table/UPDATE_DATA';
const UPDATE_INSERT_ACCESSORS   = 'table/UPDATE_INSERT_ACCESSORS';
const INITIALIZE_TABLE = 'table/INITIALIZE_TABLE';
const CHANGE_SORT = 'table/CHANGE_SORT';
const SEARCHING = 'table/SEARCHING';
const CLEAR_SEARCH = 'table/CLEAR_SEARCH';
const CHANGE_SEARCH = 'table/CHANGE_SEARCH';
const FILTER_CHECKBOX = 'table/FILTER_CHECKBOX';
const SORTED = 'table/SORTED';
const CHANGE_PAGE = 'table/CHANGE_PAGE';
const initialState = {};
const individualState = {
    page:0,
    pages:0,
    items:[], //current data
    keys:[], //accessors
    sort: function(){
        return 0
    },// default sort function
    searchText:'',
    search: function () {
        return true
    },
    _items:[], //original data
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case INITIALIZE_TABLE:
            return Object.assign({}, state, {[action.table]: individualState});
        case CHANGE_PAGE:
            return Object.assign({}, state, {[action.table]: data(state[action.table], action)});
        case INSERT_DATA:
        case UPDATE_DATA:
            return Object.assign({}, state, {[action.table]: data(state[action.table], action)});
        case UPDATE_INSERT_ACCESSORS:
            return Object.assign({}, state, {[action.table]: data(state[action.table], action)});
        case CLEAR_SEARCH:
        case SEARCHING:
        case CHANGE_SEARCH:
        case CHANGE_SORT:
            return Object.assign({}, state, {[action.table]: data(state[action.table], action)});
        case SORTED:
            return Object.assign({}, state, {[action.table]: data(state[action.table], action)});
        case FILTER_CHECKBOX:
            return Object.assign({}, state, {[action.table]: data(state[action.table], action)});
        default:
            return state;
    }
}

function data(state, action){
    switch (action.type) {
        case CHANGE_PAGE:
            return Object.assign({}, state, { page: action.page});
        case INSERT_DATA:
            return Object.assign({}, state, {items:  action.data,  _items:action.data,  pages:Math.ceil(action.data.length/12)});
        case UPDATE_DATA:
            return Object.assign({}, state, {_items:action.data});
        case UPDATE_INSERT_ACCESSORS:
            return Object.assign({}, state, {keys:  action.data});
        case SORTED:
            return Object.assign({}, state, {items:action.data,  page:0, pages:Math.ceil(action.data.length/12)});
        case SEARCHING:
            return Object.assign({}, state, {items:action.data,  searchText: action.searchText});
        case CLEAR_SEARCH:
            return Object.assign({}, state, {items:action.data,  searchText:''});
        case CHANGE_SEARCH:
            return Object.assign({}, state, {search:  action.search});
        case CHANGE_SORT:
            return Object.assign({}, state, {sort:action.sort, keys: state.keys.map(function(_key){
                if(_key.key === action.key){
                    _key.active = true;
                    _key.asc = action.asc;
                }else{
                    _key.active = false;
                    _key.asc = null;
                }
                return _key
            })});
        case FILTER_CHECKBOX:
            return Object.assign({}, state, {keys: state.keys.map(function(_key){
                if(_key.key === action.key){
                    _key.checked = action.checked;
                }
                return _key
            })});
        default:
            return state;
    }
}

export function initializeTable(table){
    return { type: INITIALIZE_TABLE, table};
}

export function insertData(table, data) {
    return { type: INSERT_DATA, table, data};
}

export function updateData(table, data) {
    return async (dispatch, getState) => {
         dispatch({ type: UPDATE_DATA, table, data});
         dispatch(filtering(table))
    }
}

export function updateAccessors(table, data) {
    return { type: UPDATE_INSERT_ACCESSORS, table, data};
}

export function updateSearch(tableKey, searchFn){
    return { type: CHANGE_SEARCH, table:tableKey, search: searchFn}
}

export function searching(tableKey, searchText){
    return async (dispatch, getState) =>{
        dispatch({ type: SEARCHING, table:tableKey, searchText});
        dispatch(filtering(tableKey));
    };
}

export function clearSearch(tableKey){
    return async (dispatch, getState) =>{
        dispatch({ type: CLEAR_SEARCH, table:tableKey});
        dispatch(filtering(tableKey));
    };
}
export function changeSort(tableKey, key, asc, sortFn){
    return async (dispatch, getState) =>{
        let table = getState().table;
        let state = table[tableKey];
        let {items} = state;
        let data =[...items];
        dispatch({ type: CHANGE_SORT, table:tableKey, key, asc, sort: sortFn});
        dispatch(sorting(tableKey, data,sortFn));
    };
}

function sorting(table, data, sort){
    data = data.sort(sort);
    return {type:SORTED, data, table}
}

export function filterCheck(tableKey, key, checked){
    return async (dispatch, getState) =>{
        dispatch({ type: FILTER_CHECKBOX, table:tableKey, key, checked});
        return dispatch(filtering(tableKey))
    };
}


function filtering(tableKey){
    return async (dispatch, getState) => {
        let table = getState().table;
        let state = table[tableKey];
        let {_items, sort, keys, search, searchText} = state;
        let data =[..._items];
        let _keys = keys.filter((k)=>k.checked);
        for (let i = 0; i < _keys.length; i ++){
            let key = _keys[i];
            data = data.filter((f)=>f[key.key] === true);
        }
        data = data.filter((item)=>search(item, searchText));
        return dispatch(sorting(tableKey, data, sort))
    }
}

export function changePage(table, page){
    page = Math.max(0, page);
    return {type:CHANGE_PAGE, table, page}

}
