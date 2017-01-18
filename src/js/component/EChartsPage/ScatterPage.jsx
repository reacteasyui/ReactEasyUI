import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import Scatter from "../../plugin/ECharts/Scatter.jsx";

export default class ScatterPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="plugin-page">
                <h1>Scatter</h1>
                <p>散点图</p>
                <Demo title="实例" component={<Scatter data={{click_add:6000000,
                                                                avaData:[{yAxis: 40, name: "平均阅读量"},{xAxis: 150, name: "平均阅读时间"}],
                                                                data:[{name:"女性",data: [[164.4, 55.5]],click:300000}]}}
                                                                x={{name:"阅读时间",measure:"秒"}}
                                                                y={{name:"阅读页数",measure:"页"}}
                                                                changeSize={true}
                                                                toolboxPosition={[0,0,null,null]}/>}>
                    {`<Scatter
    data={{
        click_add:6000000,
        avaData:[
            {yAxis: 40, name: "平均阅读量"},
            {xAxis: 150, name: "平均阅读时间"}
        ],
        data:[{
            name:"女性",
            data: [[164.4, 55.5]],
            click:300000
        }]
    }}
    x={{name:"阅读时间", measure:"秒"}}
    y={{name:"阅读页数", measure:"页"}}
    changeSize={true}
    toolboxPosition={[0,0,null,null]}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "data", type: "object", default: "", des: "", required: true},
                    {name: "x,y", type: "object", default: "", des: '对应轴的名字和单位，如：{name:"阅读时间",measure:"秒"}'},
                    {name: "changeSize", type: "boolean", default: "false", des: "散点大小是否可变，与data中click_add 和 click相关"},
                    {name: "toolboxPosition", type: "array", default: "", des: 'toolbox的位置，对应["left","top","right","bottom"],数值，百分比或"center"/"right"/"top"...'},
                    {name: "width", type: "string", default: "100%", des: "图表宽度，也可以是px或num"},
                    {name: "height", type: "string", default: "350px", des: "图表高度"}
                ]}/>
            </div>
        );
    }
}