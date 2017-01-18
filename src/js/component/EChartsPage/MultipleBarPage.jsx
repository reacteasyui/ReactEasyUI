import React from "react";
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import MultipleBar from "../../plugin/ECharts/MultipleBar.jsx";

export default class MultipleBarPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="plugin-page">
                <h1>MultipleBar</h1>
                <p>可以展示统计对象对应的数据以及对应比率两组柱形图的图表组件</p>
                <Demo title="实例" component={<MultipleBar
                    data={[
                        {value:50, name:'这是一个项目',rate:10 },
                        {value:100, name:'这是二个项目',rate:2 }
                    ]}
                />}>
                    {`<MultipleBar
    data={[
        {value:50, name:'这是一个项目',rate:10 },
        {value:100, name:'这是二个项目',rate:2 }
    ]}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "data", type: "array", default: "", des: "数组中每个对象的name为统计对象名称，value为对应第一个统计维度的数据,rate为对应的第二个统计维度的率值", required: true},
                    {name: "name", type: "array", default: "['点击量', '点击率']", des: "统计维度"},
                    {name: "color", type: "array", default: "['#57D480','#00A8FF']", des: "柱状图颜色"},
                    {name: "width", type: "string", default: "100%", des: "图表宽度，也可以是px"},
                    {name: "height", type: "string", default: "300px", des: "图表高度"}
                ]}/>
            </div>
        );
    }
}