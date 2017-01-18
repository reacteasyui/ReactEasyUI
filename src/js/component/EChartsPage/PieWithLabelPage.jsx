import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import PieWithLabel from "../../plugin/ECharts/PieWithLabel.jsx";

export default class PieAndLineChartPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[{"name":"一线城市","id":"1","value":"3967"},{"name":"二线城市","id":"2","value":"12238"}]
        }
    }

    render() {
        return (
            <div className="pie-page">
                <h1>PieWithLabel</h1>
                <p>带标签的饼图</p>
                <Demo title="实例" component={<PieWithLabel
                    name="金额（元）"
                    data={[
                        {
                            name:"一线城市",
                            id:"1",
                            value:"3967"
                        },
                        {
                            name:"二线城市",
                            id:"2",
                            value:"12238"
                        }
                    ]}
                />}>
                {`<PieWithLabel
    name="金额（元）"
    data={[
        {
            name:"一线城市",
            id:"1",
            value:"3967"
        },
        {
            name:"二线城市",
            id:"2",
            value:"12238"
        }
    ]}
/>`}
                </Demo>
                <Section data={[
                    {name:"name", type: "string", des:'统计纬度,如 "金额（元）"'},
                    {name: "tooltipShow", type: "boolean", default: 'true', des: '是否显示tooltip'},
                    {name: "legendShow", type: "boolean", default: 'true', des: '是否显示legend'},
                    {name: "moreLabel", type: "boolean", default: 'false', des: '是否在内外都显示label,默认外部显示'},
                    {name: "selectedIndex", type: "number", des: '默认选中项'},
                    {name: "data", type: "object", des: '对应数据内容,如 [{"name":"一线城市","id":"1","value":"3967"},{"name":"二线城市","id":"2","value":"12238"}]', required: true},
                    {name: "width", type: "string", default: "100%", des: "图表宽度，也可以是px或num"},
                    {name: "height", type: "string", default: "300px", des: "图表高度"}
                ]}/>
                <Section title="回调方法" method="clickCallback(data)" data={[
                    {name: 'data', type: 'object', des: '选中的数据项'},
                ]}/>
            </div>
        );
    }
}