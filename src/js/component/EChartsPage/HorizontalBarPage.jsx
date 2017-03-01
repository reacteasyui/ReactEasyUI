import React from "react";
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import HorizontalBar from "../../plugin/ECharts/HorizontalBar.jsx";

export default class VerticalBarPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="horizontal-bar-page">
                <h1>HorizontalBar</h1>
                <p>可以展示统计对象名称和对应数据的横向柱状图</p>
                <Demo title="实例" component={<HorizontalBar
                    data={[
                        {value:50, name:'这是一个项目'},
                        {value:100, name:'这是二个项目'}
                    ]}
                />}>
                    {`<HorizontalBar
    data={[
        {value:50, name:'这是一个项目'},
        {value:100, name:'这是二个项目'}
    ]}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "data", type: "array", default: "", des: "数组中每个对象的name为统计对象名称，value为对应的数据", required: true},
                    {name: "name", type: "string", default: "点击量", des: "统计维度"},
                    {name: "rate", type: "boolean", default: "false", des: "数据中对象有key为rate时，是否以百分比形式展示率值"},
                    {name: "color", type: "string", default: "#0099FF", des: "柱状图颜色"},
                    {name: "width", type: "string", default: "100%", des: "图表宽度，也可以是px"},
                    {name: "height", type: "string", default: "290px", des: "图表高度"}
                ]}/>
            </div>
        );
    }
}