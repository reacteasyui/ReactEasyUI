import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import PieAndLineChart from "../../plugin/ECharts/PieAndLineChart.jsx";

export default class PieAndLineChartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                timeData:['2016.06.01','2016.07.01','2016.08.01','2016.09.01','2016.10.01'],
                data:[
                    {value:35,name:'数据1',lineData:[2,31,21,6,2]},
                    {value:65,name:'数据2',lineData:[12,21,15,6,20]},
                    {value:85,name:'数据3',lineData:[12,26,15,6,20]},
                    {value:125,name:'数据4',lineData:[12,71,15,6,20]},
                    {value:65,name:'数据5',lineData:[12,21,15,26,20]},
                ]
            }
        }
    }

    render() {
        return (
            <div className="pie-and-line-chart-page">
                <h1>PieAndLineChart</h1>
                <p>饼图与折线图混合，点击饼图区域块可快速切换对应的折线图</p>
                <Demo title="实例" component={<PieAndLineChart
                    name="金额（元）"
                    isShowMax = {true}
                    data={this.state.data}
                />}>
                    {`<PieAndLineChart
    name="金额（元）"
    isShowMax = {true}
    data={{
        timeData:[
            '2016.06.01',
            '2016.07.01',
            '2016.08.01',
            '2016.09.01',
            '2016.10.01'
        ],
       data:[
            {
                value:35,
                name:'数据1',
                lineData:[2,31,21,6,2]
            },
            {
                value:65,
                name:'数据2',
                lineData:[12,21,15,6,20]
            },
            {
                value:85,
                name:'数据3',
                lineData:[12,26,15,6,20]},
            {
                value:125,
                name:'数据4',
                lineData:[12,71,15,6,20]},
            {
                value:65,
                name:'数据5',
                lineData:[12,21,15,26,20]
            }
       ]
}}/>`}
                </Demo>
                <Section data={[
                    {name:"name", type: "string", des:'统计纬度,如 "金额（元）"'},
                    {name: "isShowMax", type: "boolean", default: 'false', des: '是否显示最大值'},
                    {name: "rate", type: "boolean", default: 'true', des: '是否显示为率(%)'},
                    {name: "data", type: "object", des: "对应数据内容,如 {timeData:['2016.06.01','2016.07.01','2016.08.01',],data:[{value:35,name:'数据1',lineData:[2,31,21,6,2]},{value:65,name:'数据2',lineData:[12,21,15,6,20]},{value:85,name:'数据3',lineData:[12,26,15,6,20]},]}", required: true},
                    {name: "width", type: "string", default: "100%", des: "图表宽度，也可以是px或num"},
                    {name: "height", type: "string", default: "400px", des: "图表高度"}
                ]}/>
                <Section title="回调方法" method="clickCallback(data)" data={[
                    {name: 'data', type: 'object', des: '选中的数据项'},
                ]}/>
            </div>
        );
    }
}