import React from 'react';
import * as BS from 'react-bootstrap';
import ToolTip from "rc-tooltip";
import Alert from './Alert.jsx';
import Checkbox from './Checkbox.jsx';

/**
 @class Table
 @extends React.Component
 @constructor
 @param pager {Object} 分页信息 如：{pageSize: 20,pageIndex: 1}
 @param cols {Array} 列头信息 如：[{colname: "username", name: "客户姓名", checked: 1},{colname: "mobile", name: '电话', checked: 1},...]
 @param data {Array} 数据信息 如：[{"username": "北北","mobile": "13540321433"},...]
 @param [sortField] {Object} 排序字段
 @param [customCol=false] {Bool} 是否可以自定义列
 @param [exported=false] {Bool} 是否有导出按钮
 @param [maxColNum=8] {Number} 最多显示多少列
 @param [controls] {Array} 操作列信息 如： [{ name: function (item) {return "添加";},fun: function (item) {添加要执行的方法}},...]
 @return {Component} 返回Table组件
 */
export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertShow: false,
            alertMsg: "",
            visible: false,
            sortField: props.sortField || {},
            customCol: props.customCol,
            exported: props.exported,
            pager: props.pager,
            maxColNum: props.maxColNum,
            cols: props.cols,
            data: props.data,
            controls: props.controls,
            tableLoading: props.tableLoading
        }
    }

    static defaultProps = {
        customCol: false,
        maxColNum: 0
    };

    /**
     @method orderBy
     @param sort {String} 升序:asc,降序:desc
     @return {Component} 返回排序图标组件
     */
    orderBy(sort) {
        return (
            <span className="re-sort-icon">
                <i className={`re-icon re-icon-triangle-up ${sort&&sort == 'asc' ? 'active' : ''}`}></i>
                <i className={`re-icon re-icon-triangle-down ${sort&&sort == 'desc' ? 'active' : ''}`}></i>
            </span>
        );
    }

    onVisibleChange(visible) {
        this.setState({
            visible: visible
        });
    }

    onSortChanged(col) {
        let _this = this,
            sortField = _this.state.sortField,
            sort = sortField[col.colname] == "desc" ? "asc" : "desc";
        for (let item in sortField) {
            sortField[item] = "";
        }
        sortField[col.colname] = sort;
        this.setState({
            sortField: sortField
        });
        if (this.props.onSortChanged)
            this.props.onSortChanged(col.colname, sort);
    }

    saveCol() {
        let _this = this,
            cols_ul = $(this.refs.cols_ul).find("input[type='checkbox']:checked"),
            cols = this.state.cols,
            checkeditem = [];
        if (_this.state.maxColNum > 0 && cols_ul.length + cols.count((item, i)=>item.checked == 2) > _this.state.maxColNum) {
            _this.setState({
                alertShow: true,
                alertMsg: "最多选" + _this.state.maxColNum + "列喔~"
            });
            return;
        }
        cols_ul.each(function (i) {
            let _this = $(this), _val = _this.val();
            checkeditem.add(_val);
        });
        cols.forEach((r)=> {
            if (+r.checked < 2)
                r.checked = ~~checkeditem.contains(r.colname);
        });
        _this.setState({
            visible: false,
            cols: cols
        });
        if (_this.props.onSaveCol) {
            _this.props.onSaveCol(cols);
        }
    }

    //公共入口
    onPageChanged(pager) {
        let _this = this;
        // _this.setState({
        //     tableLoading: true,
        //     pager: pager
        // });
        if (_this.props.onPageChanged)
            _this.props.onPageChanged(pager);
    }

    onPageSelected(dom, event) {
        let _this = this;
        if (_this.whenDataChange()) {
            let pageIndex = event.eventKey,
                pager = this.state.pager;
            pager.page_index = pageIndex;
            _this.onPageChanged(pager);
        }
    }

    onGotoPage() {
        let _this = this;
        if (_this.whenDataChange()) {
            let page_input = this.refs.pageInput,
                val = ~~page_input.value;
            if (!val || val <= 0) {
                _this.setState({
                    alertShow: true,
                    alertMsg: "别闹,好不好~"
                });
                return;
            }
            let pager = this.state.pager,
                pagenum = ~~(pager.page_count / pager.page_size) + 1;
            if (val > pagenum) val = pagenum;
            pager.page_index = val;
            _this.onPageChanged(pager);
            page_input.value = "";
        }
    }

    onPageSizeChange() {
        let _this = this;
        if (_this.whenDataChange()) {
            let pager = _this.state.pager;
            pager.page_size = this.refs.tableSelect.value;
            pager.page_index = 1;
            _this.onPageChanged(pager);
        }
    }

    whenDataChange(callback) {
        let _this = this;
        if (_this.state.tableLoading) {
            _this.setState({
                alertShow: true,
                alertMsg: "请稍后..."
            });
            return false;
        }
        return true;
    }

    render() {
        const {
            customCol, subItem, exported, ...props
        } = this.props;
        //console.log(this.state.sortField)
        let _ToolTip = null, Popover = null, PagePanel = null, Pager = null;
        //是否有自定义列
        if (customCol) {
            Popover = (
                <div>
                    <div className="re-table-scroll">
                        <ul className="re-pop-list" ref="cols_ul">
                            {
                                this.state.cols && this.state.cols.map((r, i)=> {
                                    let checked = +r.checked;
                                    if (checked > 1)
                                        return null;
                                    return (
                                        <li key={i} className={`col-${r.colname}`}>
                                            <Checkbox checked={checked} value={r.colname}>{r.name}</Checkbox>
                                        </li>);
                                })
                            }
                        </ul>
                    </div>
                    <div className="re-pop-btn">
                        <input type="submit" onClick={this.saveCol.bind(this)} defaultValue="保存"/>
                    </div>
                </div>
            );
            //console.log(this.state);
            _ToolTip = (<ToolTip
                visible={this.state.visible}
                animation="zoom"
                prefixCls="rc-tooltip"
                onVisibleChange={this.onVisibleChange.bind(this)}
                trigger="click"
                placement="bottom"
                overlay={Popover}>
                <a href="javascript:;">自定义列表</a>
            </ToolTip>);
        }
        //是否显示分页
        if (this.state.pager) {
            let pageCount = +(this.state.pager.page_count % this.state.pager.page_size) == 0 ? 0 : 1,
                maxPage = ~~(this.state.pager.page_count / this.state.pager.page_size) + pageCount;
            if (maxPage > 1) {
                PagePanel = (
                    <div className="re-page-panel">
                        <BS.Pagination
                            prev
                            next
                            ellipsis
                            boundaryLinks
                            items={maxPage}
                            maxButtons={5}
                            activePage={+this.state.pager.page_index}
                            onSelect={this.onPageSelected.bind(this)}
                        />
                        <div className="re-go-to-page">
                            去第<input type="text" ref="pageInput"/>页
                            <button onClick={this.onGotoPage.bind(this)}>确定</button>
                        </div>
                    </div>
                );
            }
            Pager = (
                <div className="re-table-footer-nav">
                    <div className="re-items-per-page">
                        每页显示
                        <select defaultValue={this.state.pager.page_size}
                                onChange={this.onPageSizeChange.bind(this)}
                                ref="tableSelect">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        条
                    </div>
                    {PagePanel}
                </div>
            );
        }
        let _data = this.state.data, _currData = [];
        if (subItem && _data && _data.length) {
            _data.forEach((r, i)=> {
                r["subIndex"] = i;
                _currData.add(r);
                if (r.subitems && r.subitems.length) {
                    r.subitems.forEach((subr, j)=> {
                        subr["sub"] = true;
                        subr["subIndex"] = i;
                        _currData.add(subr);
                    });
                }
            });
        }
        else
            _currData = _data;

        return (
            <div>
                <div className="re-custom-btn">
                    {customCol ? _ToolTip : null}
                    {customCol && exported ? " | " : null}
                    {exported ? <a href={exported}>导出</a> : null}
                </div>
                <div className="re-table-wrapper">
                    <Alert show={this.state.alertShow} onDismiss={()=>this.setState({alertShow:false})} dismissAfter={2000}>{this.state.alertMsg}</Alert>
                    <table className={`table ${this.state.cols&&this.state.cols.count((item, index)=>item.checked > 0)>9 ? 're-more-cols' : ''}`}>
                        <thead>
                        <tr>
                            {
                                this.state.cols && this.state.cols.map((r, i)=> {
                                    let hasOrderBy = this.state.sortField[r.colname] != undefined;
                                    return (
                                        <th key={i} onClick={()=>hasOrderBy?this.onSortChanged(r):null}
                                            className={`re-col-${r.colname} ${+r.checked > 0 ? '' : 'hide'}`}>
                                            {r.name}{hasOrderBy ? this.orderBy(this.state.sortField[r.colname]) : ''}
                                        </th>
                                    )
                                })
                            }
                            {this.state.controls ? (<th className="re-col-operate">操作</th>) : null}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            _currData && _currData.length ? _currData.map((r, i)=> {
                                    let _td = null, _tr = null;
                                    if (this.state.controls) {
                                        _td = (
                                            <td key={i} className="re-col-operate">
                                                {
                                                    this.state.controls.map((i, index)=> {
                                                        let item = i.name(r);
                                                        if (!item) return;
                                                        return (
                                                            <a key={index} href="javascript:;" onClick={()=>i.fun(r)}>{item}</a>
                                                        )
                                                    })
                                                }
                                            </td>
                                        );
                                    }
                                    return (
                                        <tr key={i} className={`${r.sub ? 're-subitem hide' + r.subIndex : ''}`}>
                                            {
                                                this.state.cols && this.state.cols.map((t, n)=> {
                                                    return (
                                                        <td key={n} className={`re-col-${t.colname} ${+t.checked > 0 ? '' : 'hide'}`}>
                                                            {this.props.format(t, r, i) }
                                                        </td>
                                                    );
                                                })
                                            }
                                            {_td}
                                        </tr>)
                                }) : (<tr>
                                    <td colSpan={this.state.cols&&this.state.cols.count((item,index)=>item.checked)+(this.state.controls?1:0)}>
                                        数据不在服务区
                                    </td>
                                </tr>)
                        }
                        </tbody>
                        <tbody className={`re-table-loading re-table-loading-bg ${this.state.tableLoading? '' : 'hide'}`}>
                        </tbody>
                        <tbody className={`re-table-loading ${this.state.tableLoading? '' : 'hide'}`}>
                        <tr>
                            <td>正在加载数据</td>
                        </tr>
                        </tbody>
                    </table>
                    {Pager}
                </div>
            </div>
        );
    }

    componentWillReceiveProps(props) {
        const {
            pager, cols, data, tableLoading, controls
        } = props;
        this.setState({
            pager: pager,
            cols: cols,
            data: data,
            controls: controls,
            tableLoading: tableLoading
        });
    }
}