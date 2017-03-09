import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import Overlap from "../../plugin/Progress/Overlap.jsx";

export default class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="overlap-page">
                <h1>Overlap</h1>
                <p>比例图占比图</p>
                <Demo title="实例" component={<Overlap
                    data={
                        [
                            {
                                sets:['a'],
                                label:100
                            },
                            {
                                sets:['b'],
                                label:120
                            },
                            {
                                sets:['a','b'],
                                label:20
                            },
                        ]
                    }
                    width="50%"
                    height="40px"
                />}>
                    {`<Overlap
    data={
        [
            {
                sets:['a'],
                label:100
            },
            {
                sets:['b'],
                label:120
            },
            {
                sets:['a','b'],
                label:20
            },
        ]
    }
    width="50%"
    height="40px"
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "data", type: "object", des: "组件所需数据",required:true},
                    {name: "width", type: "string", default: "100%", des: "组件占父容器的百分比宽"},
                    {name: "height", type: "string", default: "50px", des: "组件占高"},
                    {name: "color", type: "array", default: "[\'#01a6d6\', \'#7572f7\', \'#ffa260\']", des: "重合度组件左、右、重合部分的背景色数组"},
                ]}/>
            </div>
        );
    }
}