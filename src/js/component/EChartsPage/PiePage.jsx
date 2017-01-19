import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";

export default class PiePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[{value:335, name:'固定位'},{value:310, name:'SEM'},{value:234, name:'RTB'}]
        }
    }

    render() {
        return (
            <div className="pie-page">
                <h1>Pie</h1>
                <p>简单的环形占比图</p>
                <Demo title="实例" component={<Pie
                    name="金额（元）"
                    data={[
                        {value:335, name:'固定位'},
                        {value:310, name:'SEM'},
                        {value:234, name:'RTB'}
                    ]}
                />}>
                    {`<Pie
    name="金额（元）"
    data={[
        {value:335, name:'固定位'},
        {value:310, name:'SEM'},
        {value:234, name:'RTB'}
    ]}
/>`}
                </Demo>
                <Section data={[
                    {name: "color", type: "array", default: '["#ff4f4f", "#57d480", "#0099ff", "#f3b33c", "#8da0cb", "#c6c644", "#acc475", "#ab7433", "#aa8d8a"]',  des: '颜色,如 ["#ff4f4f", "#57d480", "#0099ff"]'},
                    {name:"name", type: "string", default:'数值',des:'统计纬度,如 "金额（元）"'},
                    {name: "data", type: "array", des: "对应数据内容,如 [{value:335, name:'固定位'},{value:310, name:'SEM'},{value:234, name:'RTB'}]", required: true},
                    {name: "width", type: "string", default: "100%", des: "图表宽度，也可以是px或num"},
                    {name: "height", type: "string", default: "200px", des: "图表高度"}
                ]}/>
            </div>
        );
    }
}