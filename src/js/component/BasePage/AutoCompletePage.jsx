import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import AutoComplete from "../../plugin/Base/AutoComplete.jsx";

export default class AutoCompletePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: null,
        }
    }

    onSearch(value) {
        let data = [
            {id:1,name:'2016年12月28日'},
            {id:2,name:'数据测试名字test1'},
            {id:3,name:'欢迎来到 ReactEasyUI'},
            {id:4,name:'welcome'},
            {id:5,name:'北京市海淀区'},
            {id:6,name:'北京市朝阳区'},
        ],filterData=[];
        data.map((r,i)=>{
            if(r.name.indexOf(value) != -1){
                filterData.push(r);
            }
        });
        this.setState({
            searchData:filterData,
        });
    }

    render() {
        return (
            <div className="pie-page">
                <h1>AutoComplete</h1>
                <p>根据用户输入值进行搜索和过滤，让用户快速找到并从预设值列表中选择。</p>
                <Demo title="实例" component={<div className="searchCon"><AutoComplete
                    searchData={this.state.searchData}
                    onFilter={this.onSearch.bind(this)}/></div>
                }>
                    {`<AutoComplete
    searchData={this.state.searchData}
    onFilter={this.onSearch.bind(this)}
/>

// 初始化
this.state = {
    searchData: null
}

// 回调方法，根据关键字过滤数据
onSearch(value) {
    let data = [
        {id: 1, name: '2016年12月28日'},
        {id: 2, name: '数据测试名字test1'},
        {id: 3, name: '欢迎来到 ReactEasyUI'},
        {id: 4, name: 'welcome'},
        {id: 5, name: '北京市海淀区'},
        {id: 6, name: '北京市朝阳区'},
    ],filterData = [];
    data.map((r,i)=> {
        if( r.name.indexOf(value) != -1 ) {
            filterData.push(r);
        }
    });
    this.setState({
        searchData: filterData
    });
}`}
                </Demo>
                <Section title="参数" data={[
                    {name: "searchData", type: "object", default: 'null',  des: '检索结果数据内容', required: true},
                ]}/>
                <Section title="回调方法" method="onFilter(value)" data={[
                    {name: 'value', type: 'string', des: '关键字'},
                ]}/>
                <Section method="getData(value)" data={[
                    {name: 'value', type: 'string', des: '关键字'},
                ]}/>
            </div>
        );
    }
}