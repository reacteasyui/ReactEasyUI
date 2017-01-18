import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import Progress from "../../plugin/Progress/Progress.jsx";

export default class ProgressPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="plugin-page">
                <h1>Progress</h1>
                <p>加载百分比条状图</p>
                <Demo title="实例" component={<Progress
                    now={80}
                    title="正在加载："
                />}>
                    {`<Progress
    now={80}
    title="正在加载："
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "now", type: "number", default: "0", des: "进度条的进度百分比"},
                    {name: "title", type: "string", des: "进度条的提示文字"},
                ]}/>
            </div>
        );
    }
}