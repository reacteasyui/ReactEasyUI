import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import ProgressChart from "../../plugin/Progress/ProgressChart.jsx";

export default class ProgressChartPage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="progress-chart-page">
                <h1>ProgressChart</h1>
                <p>简单的环形进度条，依赖与echarts.js</p>
                <Demo title="实例" component={<ProgressChart
                    num={34}
                    width="100%"
                    height={100}
                />}>
                    {`<ProgressChart
    num={34}
    width="100%"
    height={100}
/>`}
                </Demo>
                <Section data={[
                    {name: "num", type: "number", des:'进度值', required:true},
                    {name:"color", type: "string", des:'进度条颜色'},
                    {name: "width", type: "string", des: "图表宽度，也可以是px或num", required: true},
                    {name: "height", type: "string", des: "图表高度", required: true}
                ]}/>
            </div>
        );
    }
}