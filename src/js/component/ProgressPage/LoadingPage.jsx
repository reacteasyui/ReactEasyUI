import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import Loading from "../../plugin/Progress/Loading.jsx";

export default class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loading-page">
                <h1>Loading</h1>
                <p>加载动画</p>
                <Demo title="实例" component={<Loading
                    height="80"
                    color="#9393FF"
                />}>
                    {`<Loading
    height="80"
    color="#9393FF"
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "height", type: "string || number", default: "300", des: "动画占高"},
                    {name: "color", type: "string", default: "#09f", des: "加载动画的颜色"},
                ]}/>
            </div>
        );
    }
}