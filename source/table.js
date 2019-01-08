import React from 'react';
import {insertData, updateData, updateAccessors, initializeTable, changeSort, filterCheck, changePage, updateSearch, searching, clearSearch} from './reducer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class Table extends React.Component{

    constructor(props){
        super(props);
        this.state = {table: props.tableKey};
        this.changeSort = this.changeSort.bind(this);
        this.searching = this.searching.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeFilterCheckBox = this.changeFilterCheckBox.bind(this);
    }

    componentDidMount(){
        let {data, accessors} = this.props;
        let {table} = this.state;
        if(typeof this.props.table === 'undefined'){
            this.props.initializeTable(table);
            this.props.insertData(table, data);
            this.props.updateAccessors(table, accessors);
            if(this.props.search){
                this.props.updateSearch(table, this.props.search);
            }
        }else{
            //handle remounting and updating of data
            if(data !== table._items){
                this.props.updateData(table, data, false);
            }
        }
    }

    componentWillReceiveProps(props){
        let {data} = props;
        if(data !== this.props.data){
            let {table} = this.state;
            props.updateData(table, data, true);
        }
    }

    changeSort(key, asc){
        let {table} = this.state;
        this.props.changeSort(table, key, asc, function(a, b){
            if(typeof a[key] ==='string'){
                if(asc)
                    return b[key].localeCompare(a[key]);
                else
                    return -b[key].localeCompare(a[key]);
            }else if(typeof a[key] === 'number'){
                if(asc)
                    return b[key]-a[key];
                else
                    return a[key]-b[key]
            }
            return 0
        })
    }

    changeFilterCheckBox(key, tick){
        let {table} = this.state;
        this.props.filterCheck(table, key, tick)
    }

    searching(text){
        let {table} = this.state;
        this.props.searching(table, text)
    }

    changePage(page, pages){
        let {table} = this.state;
        page = Math.max(0, page);
        page = Math.min(page, pages-1);
        this.props.changePage(table, page)
    }

    clearSearch(){
        let {table} = this.state;
        this.props.clearSearch(table)
    }

    render(){
        let changeSort = this.changeSort;
        let changePage = this.changePage;
        let changeFilterCheckBox = this.changeFilterCheckBox;
        let {table} = this.state;
        let {rowKey} = this.props;
        let state = this.props.table;
        if(state){
            let {keys, items, page, pages, searchText} = state;
            return (
                <div>
                    <div className="my-1">
                        <button className="btn btn-sm" onClick={()=>changePage(page - 1, pages)}>previous</button>
                        <span className="mx-2"><input style={{width:60}} value={page+1} onChange={(e)=>changePage(+ e.target.value -1, pages)}/>/{pages}</span>
                        <button className="btn btn-sm" onClick={()=>changePage(page + 1, pages)}>next</button>
                        <div className='float-right'>
                            <button type="submit" onClick={this.clearSearch} className="btn btn-primary">Clear</button>
                        </div>
                        <div className='float-right'>
                            <input className="form-control" placeholder='search' onChange={(e)=>this.searching(e.target.value)} value={searchText}/>
                        </div>
                        <div className="clearfix"/>
                    </div>
                    <table className="table bg-white">
                        <thead className="thead-inverse">
                        <tr>
                            {keys.map(function(k, i){
                                if(k.checkbox){
                                    return <th style={{cursor:'pointer'}} key={i} onClick={()=>changeFilterCheckBox(k.key, !k.checked)}>
                                        <div className="form-group mb-0">
                                            <input className="form-check-input" type='checkbox' readOnly checked={!!k.checked}/>
                                            <label className="mb-0">{k.title}</label>
                                        </div>
                                    </th>
                                }
                                return <th style={{cursor:'pointer'}} key={i} onClick={()=>changeSort(k.key, !k.asc)}>{k.active ? (k.asc ? '<':'>'):''}{k.title}</th>
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {items.slice(page*12, (page+1)*12).map(function(i){
                            return <tr key={i[rowKey]}>
                                {keys.map(function(k,index){
                                    if(k.checkbox){
                                        return <td key={index}><input type='checkbox' checked={i[k.key]} readOnly/></td>
                                    }
                                    if(k.render){
                                        return <td key={index}>{k.render(i)}</td>
                                    }
                                    return <td key={index}>{i[k.key]}</td>
                                })}
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            )
        }else{
           return <table/>
        }
    }
}

Table = connect(
    (state, props) => ({
        table: state.table[props.tableKey],
    }),
    { insertData, updateData, updateAccessors, initializeTable, changeSort, filterCheck, changePage, updateSearch, searching, clearSearch}
)(Table);

Table.propTypes = {
    data: PropTypes.array,
    accessors: PropTypes.array,
    tableKey:PropTypes.string.isRequired,
    rowKey:PropTypes.string,
    search:PropTypes.func
};
export default Table