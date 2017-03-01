import React from "react";
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import VerticalBar from "../../plugin/ECharts/VerticalBar.jsx";

export default class VerticalBarPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="vertical-bar-page">
                <h1>VerticalBar</h1>
                <p>简单的纵向柱状图</p>
                <Demo title="实例" component={<VerticalBar
                    data={[
                        {name:"一线城市",value:3967},
                        {name:"二线城市",value:12238},
                        {name:"三线城市",value:8534}
                    ]}
                />}>
                    {`<VerticalBar
    data={[
        {name:"一线城市",value:3967},
        {name:"二线城市",value:12238},
        {name:"三线城市",value:8534}
    ]}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "data", type: "array", default: "", des: "数组中每个对象的name为统计对象名称，value为对应的数据", required: true},
                    {name: "name", type: "string", default: "点击量", des: "统计维度"},
                    {name: "width", type: "string", default: "100%", des: "图表宽度，也可以是px"},
                    {name: "height", type: "string", default: "300px", des: "图表高度"}
                ]}/>
            </div>
        );
    }
}