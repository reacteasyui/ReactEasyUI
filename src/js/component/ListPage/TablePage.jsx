import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx"
import Table from '../../plugin/List/Table.jsx';

export default class TablePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cols: [
                {colname: "name", name: "姓名", checked: 2},
                {colname: "mobile", name: '电话', checked: 1},
                {colname: "age", name: '年龄', checked: 1}
            ],
            data: this.initData(0, 10),
            pager: {
                page_index: 1,
                page_size: 10,
                page_count: 100
            },
            sort: {
                order_by: "",
                asc_desc: ""
            },
            controls: [
                {   //成交
                    name: function (item) {
                        return "暴打" + item.name;
                    },
                    fun: function (item) {
                        alert("我打了" + item.name);
                    }
                }]
        }
        this.sortField = {age: ""};
    }

    initData(num, size, sort) {
        let _data = [], _this = this;
        if (sort && sort.asc_desc == "desc") {
            for (let i = 100 - num * size; i > 100 - (num + 1) * size; i--)
                _data.push({name: "王小" + i, mobile: 13520226600 + i, age: 20 + i});
        }
        else {
            for (let i = num * size; i < (num + 1) * size; i++)
                _data.push({name: "王小" + i, mobile: 13520226600 + i, age: 20 + i});
        }
        return _data;
    }

    //点击排序回调，返回字段名，和升序降序
    onSortChanged(orderby, sort) {
        let _sort = this.state.sort, _pager = this.state.pager;
        _sort.order_by = orderby;
        _sort.asc_desc = sort;
        _pager.page_index = 1;
        let _data = this.initData(0, _pager.page_size, _sort);
        this.setState({
            pager: _pager,
            sort: _sort,
            data: _data
        });
    }

    formatData(col, data, i) {
        return data[col.colname] || "- -";
    }

    onPageChanged(pager) {
        let _this = this;
        _this.setState({
            pager: pager,
            data: _this.initData(pager.page_index - 1, pager.page_size, _this.state.sort)
        });
    }

    //保存表头，返回变化后的列
    onSaveCol(cols) {
        console.log(cols);
    }

    render() {
        return (
            <div className="table-page">
                <h1>Table</h1>
                <p>自动渲染数据，并带有分页、排序、自定义列功能的表格</p>
                <Demo component={<Table
                    data={this.state.data}
                    cols={this.state.cols}
                    customCol
                    sortField={this.sortField}
                    pager={this.state.pager}
                    controls={this.state.controls}
                    tableLoading={false}
                    onSortChanged={this.onSortChanged.bind(this)}
                    format={this.formatData.bind(this)}
                    onPageChanged={this.onPageChanged.bind(this)}
                    onSaveCol={this.onSaveCol.bind(this)}
                />}>
                    {`this.state = {
    cols: [
        {colname: "name", name: "姓名", checked: 2},
        {colname: "mobile", name: '电话', checked: 1},
        {colname: "age", name: '年龄', checked: 1}
    ],
    data: this.initData(0, 10),
    pager: {
        page_index: 1,
        page_size: 10,
        page_count: 100
    },
    sort: {
        order_by: "",
        asc_desc: ""
    },
    controls: [
        {   //成交
            name: function (item) {
                return "暴打" + item.name;
            },
            fun: function (item) {
                alert("我打了" + item.name);
            }
        }]
}
this.sortField = {age: ""};

//初始化数据
initData(num, size, sort) {
    let _data = [], _this = this;
    if (sort && sort.asc_desc == "desc") {
        for (let i = 100 - num * size; i > 100 - (num + 1) * size; i--)
            _data.push({name: "王小" + i, mobile: 13520226600 + i, age: 20 + i});
    }
    else {
        for (let i = num * size; i < (num + 1) * size; i++)
            _data.push({name: "王小" + i, mobile: 13520226600 + i, age: 20 + i});
    }
    return _data;
}

//排序回调
onSortChanged(orderby, sort) {
    let _sort = this.state.sort, _pager = this.state.pager;
    _sort.order_by = orderby;
    _sort.asc_desc = sort;
    _pager.page_index = 1;
    let _data = this.initData(0, _pager.page_size, _sort);
    this.setState({
        pager: _pager,
        sort: _sort,
        data: _data
    });
}

//格化数据列
formatData(col, data, i) {
    return data[col.colname] || "- -";
}

//翻页回调
onPageChanged(pager) {
    let _this = this;
    _this.setState({
        pager: pager,
        data: _this.initData(pager.page_index - 1, pager.page_size, _this.state.sort)
    });
}

//保存表头，返回变化后的列
onSaveCol(cols) {
    console.log(cols);
}

<Table data={this.state.data}
    cols={this.state.cols}
    customCol
    sortField={this.sortField}
    pager={this.state.pager}
    controls={this.state.controls}
    tableLoading={false}
    onSortChanged={this.onSortChanged.bind(this)}
    format={this.formatData.bind(this)}
    onPageChanged={this.onPageChanged.bind(this)}
    onSaveCol={this.onSaveCol.bind(this)}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "data", type: "array", des: '数据信息 如：[{"name": "北北","mobile": "13540321433",age:30},...]', required: true},
                    {name: "cols", type: "array", des: '列头信息 如：[{colname: "name", name: "客户姓名", checked: 1},{colname: "mobile", name: "电话", checked: 1},...]', required: true},
                    {name: "sortField", type: "object", des: '排序字段 如：{age: "desc"} 含义为按照age列倒序排列，其中value值默认为空，可选"asc"、"desc"'},
                    {name: "customCol", type: "boolean", default:"false", des: '是否可以自定义列'},
                    {name: "pager", type: "object",default:'{page_size: 10,page_index: 1,page_count:20}',  des: '分页信息,page_size每页大小，page_index当前页码，page_count总数据条数', required: true},
                    {name: "controls", type: "array", des: '操作列信息 如： [{ name: function (item) {return "添加";},fun: function (item) {添加要执行的方法}},...]'},
                    {name: "maxColNum", type: "number", default:"8", des: '最多显示多少列'},
                    {name: "tableLoading", type: "boolean", default:"false", des: '是否显示loading状态'},
                    {name: "exported", type: "boolean", default:"false",  des: '是否有导出按钮'}
                ]}/>
                <Section title="回调方法" method="formatData(col, data, i)"
                         des="格式化列数据方法"
                         data={[
                             {name: 'col', type: 'object', des: '当前列对象'},
                             {name: 'data', type: 'object', des: '当前数据对象'},
                             {name: 'i', type: 'number', des: '数据列索引'},
                         ]}/>
                <Section method="onPageChanged(pager)"
                         des="分页回调方法(页码发生变化时触发)"
                         data={[
                             {name: 'pager', type: 'object', des: '当前分页对象'}
                         ]}/>
                <Section method="onSortChanged(orderby, sort)"
                         des="排序回调方法"
                         data={[
                             {name: 'orderby', type: 'string', des: '要排序的列名'},
                             {name: 'sort', type: 'string', default:"服务器返回顺序",des: '要排序的方法，可选asc和desc'}
                         ]}/>
                <Section method="onSaveCol(cols)"
                         des="自定义列后回调方法"
                         data={[
                             {name: 'cols', type: 'object', des: '返回新的自定义列,其中checked值 0为隐藏、1为显示、2为不可被定义且始终显示'}
                         ]}/>
            </div>)
            ;
    }
}