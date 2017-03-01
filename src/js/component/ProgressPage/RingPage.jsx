import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import Ring from "../../plugin/Progress/Ring.jsx";

export default class RingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ring-page">
                <h1>Ring</h1>
                <p>百分比圆环图</p>
                <h2>实例</h2>
                <Demo component={<Ring
                    goalNum={80}
                    diameter={120}
                    ringWidth={15}
                    colorIndex={2}
                    topWord={80+'%'}
                    bottomWord="达标率"
                    color="#4A4AFF"
                />}>
                    {`<Ring
    goalNum={80}
    diameter={120}
    ringWidth={15}
    colorIndex={2}
    topWord={80+'%'}
    bottomWord="达标率"
    color="#4A4AFF"
/>`}
                </Demo>
                <Section data={[
                    {name: "goalNum", type: "number", required: true, des: "展示百分比的数值,如:80"},
                    {name: "diameter", type: "number", default: "100", des: '圆环或饼形图的直径'},
                    {name: "ringWidth", type: "number", default: "10", des: '圆环的宽度'},
                    {name: "colorIndex", type: "number", default: "0", des: '圆环的颜色数组的下标,[\'#009BF7\', \'#FEBD57\', \'#FE4D4D\', \'#FEBD57\', \'#9A25FF\', \'#43a647\']'},
                    {name: "color", type: "string", default: "null", des: '自定义圆环的颜色。当自定义颜色时，colorIndex失效'},
                    {name: "topWord", type: "string || number", des: '圆环内部上半部分文字内容'},
                    {name: "bottomWord", type: "string || number", des: '圆环内部下半部分文字内容'},
                ]}/>
            </div>
        );
    }
}