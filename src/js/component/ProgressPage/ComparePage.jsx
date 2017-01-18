import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import Compare from "../../plugin/Progress/Compare.jsx";

export default class ComparePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="plugin-page">
                <h1>Compare</h1>
                <p>用于两组数据对比</p>
                <Demo title="实例" component={<Compare
                    data={[
                        {name:"一次到店", num:2103,per:55},
                        {name:"二次到店", num:1788,per:45}
                    ]}
                />}>
                    {`<Compare
    data={[
        {name:"一次到店", num:2103,per:55},
        {name:"二次到店", num:1788,per:45}
    ]}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "data", type: "array", default: "", des: "数组中对象的name和num在组件对应位置显示，per以对应颜色占比形式展示", required: true},
                    {name: "width", type: "string || number", default: "100%", des: "组件的宽"},
                    {name: "height", type: "string || number", default: "70px", des: "组件的高"}
                ]}/>
            </div>
        );
    }
}