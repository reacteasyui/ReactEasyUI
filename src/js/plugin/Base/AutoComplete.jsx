import React from 'react';
import ReactDOM from 'react-dom';
/**
 @class AutoComplete
 @extends React.Component
 @constructor
 @param searchShow {Boolean} 筛选列表是否显示
 @param searchData {Json} 筛选结果数据
 @param onFilter {Function} 筛选列表查询方法
 @param getData {Function} 根据内容查询列表
 @return {Component} 返回AutoComplete组件
 */

export default class AutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filter:{
                search:'',
            },
            searchData: props.searchData || null,
            searchShow:props.searchData ? true : false,
        }
        this.inputID = 'input_' + ~~(Math.random() * 100000);
    }
    selectedFn(value) {
        let _this = this,
            _search = _this.state.filter;
        _search.search = value;
        $('#'+_this.inputID).val(value);
        _this.setState({
            searchShow: false
        });
    }

    handleChangeValue(event) {
        let _this = this;
        _this.setState({filter: {search: event.target.value}});
    }

    onSearch(e) {
        let _this = this, code = e.keyCode, type = e.type;
        if (e.type == 'keydown') return;
        if(code == 13){
            _this.props.getData(_this.state.filter.search);
        }else{
            _this.props.onFilter(_this.state.filter.search);
        }

    }

    hideSearch() {
        let _this = this;
        setTimeout(()=> {
            _this.setState({
                searchShow: false,
            });
        }, 200)
    }

    onDel() {
        let _this = this, _filter = _this.state.filter;
        _filter.search = "";
        $('#'+_this.inputID).val('');
        _this.setState({
            filter: _filter,
            searchShow: false,
        })
    }
    getDataFn(){
        this.props.getData(this.state.filter.search);
    }

    render(){
        return (
            <div>
                <div className="search_div _search _search-focus">
                    <input type="text" id={this.inputID} value={this.state.filter.searech}
                           onChange={this.handleChangeValue.bind(this)}
                           onKeyUp={this.onSearch.bind(this)}
                           onBlur={this.hideSearch.bind(this)}
                    />
                    <div className={`${this.state.filter.search.length>0 ?"":"hide"} delIcon`}
                         onClick={this.onDel.bind(this)}>×
                    </div>
                    <div className="search-btn" onClick={this.getDataFn.bind(this)}>
                        <i className="iconfont icon-search"></i>
                    </div>
                </div>
                <div className={`searchDate ${this.state.searchData && this.state.searchData.length && this.state.searchShow ? '':'hide'}`}>
                    {
                        this.state.searchData && this.state.searchData.map((r,i)=>{
                            let name = r.plan_name || r.media_name || r.name;
                            return (
                                <span key={i} onClick={()=>{this.selectedFn(name)}}>{name}</span>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    componentWillReceiveProps(props){
        let _this = this;
        _this.setState({
            searchData: props.searchData || null,
            searchShow: props.searchData ? true : false,
        });
    }
}