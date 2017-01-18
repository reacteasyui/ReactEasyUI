import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import PieChart from "../../plugin/Progress/PieChart.jsx";

export default class PieChartPage extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="pie-page">
                <h1>PieChart</h1>
                <p>简单的圆形占比图，依赖与echarts.js</p>
                <Demo title="实例" component={<PieChart
                    num={34}
                />}>
                    {`<PieChart
    num={34}
/>`}
                </Demo>
                <Section data={[
                    {name: "num", type: "number", des:'进度值', required:true},
                    {name:"color", type: "string", des:'进度条颜色'},
                    {name: "width", type: "string", default: "100%", des: "图表宽度，也可以是px或num"},
                    {name: "height", type: "string", default: "100px", des: "图表高度"}
                ]}/>
            </div>
        );
    }
}