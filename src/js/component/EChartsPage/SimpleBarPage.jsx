import React from "react";
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import SimpleBar from "../../plugin/ECharts/SimpleBar.jsx";

export default class DateRangePickerPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="plugin-page">
                <h1>SimpleBar</h1>
                <p>简单的横向柱状图</p>
                <Demo title="实例" component={<SimpleBar
                    data={[
                        {value:335, name:'cx-4'},
                        {value:310, name:'雪弗兰'},
                        {value:234, name:'福特'}
                    ]}
                />}>
                    {`<SimpleBar
    data={[
        {value:335, name:'cx-4'},
        {value:310, name:'雪弗兰'},
        {value:234, name:'福特'}
    ]}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "data", type: "array", default: "", des: "数组中每个对象的name为统计对象名称，value为对应的数据", required: true},
                    {name: "name", type: "string", default: "点击量", des: "统计维度"},
                    {name: "width", type: "string", default: "100%", des: "图表宽度，也可以是px"},
                    {name: "height", type: "string", default: "200px", des: "图表高度"}
                ]}/>
            </div>
        );
    }
}