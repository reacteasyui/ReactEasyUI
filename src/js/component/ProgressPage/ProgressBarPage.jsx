import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import ProgressBar from "../../plugin/Progress/ProgressBar.jsx";

export default class ProgressBarPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="progress-bar-page">
                <h1>ProgressBar</h1>
                <p>可以显示目标值、达到目标值时显示奖杯的进度条</p>
                <Demo title="实例" component={<ProgressBar
                    num={10}
                    goalNum={60}
                    goalShow={true}
                    rate={true}
                />}>
                    {`<ProgressBar
    num={10}
    goalNum={60}
    goalShow={true}
    rate={true}
/>`}
                </Demo>
                <Demo component={<ProgressBar
                    num={110}
                    goalNum={60}
                    goalShow={false}
                    rate={false}
                />}>
                    {`<ProgressBar
    num={110}
    goalNum={60}
    goalShow={false}
    rate={false}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "num", type: "number", default: "", des: "数值型进度值"},
                    {name: "goalNum", type: "number", default: "", des: "目标值;进度值大于等于目标值时，达到显示奖杯"},
                    {name: "rate", type: "boolean", default: "true", des: "进度条数值是否表示百分比"},
                    {name: "goalShow", type: "boolean", default: "false", des: "进度条上是否展示目标值"}
                ]}/>
            </div>
        );
    }
}