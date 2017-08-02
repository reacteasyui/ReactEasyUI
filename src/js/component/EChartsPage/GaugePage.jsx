import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import Gauge from "../../plugin/ECharts/Gauge.jsx";

export default class GaugePage extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            data:[{value:335, name:'固定位'},{value:310, name:'SEM'},{value:234, name:'RTB'}]
        }*/
        this.state =  {
            percent:0.8,
        }
    }

    render() {
        let description = `${this.state.percent*1000/10}%`;
        return (
            <div className="gauge-page">
                <h1>Gauge</h1>
                <p>简单的仪表盘</p>
                <Demo title="实例" component={<Gauge
                    color={['#fa505e','#d2d2d2','#000']}
                    fontSize="32"
                    percent={this.state.percent}
                    description={description}
                    position={["40%", "59%"]}
                />}>
                    {`<Gauge
    color={['#fa505e','#d2d2d2','#000']}
    fontSize="32"
    percent={0.8}
    description='80%'
    position={["40%", "59%"]}
/> `}
                </Demo>
                <Section data={[
                    {name: "angle", type: "array", default: '[225,-45]',  des: '仪表盘开始结束角度[开始角度,结束角度]'},
                    {name:"position", type: "array", default:'["60%", "59%"]',des:'仪表盘位置"'},
                    {name: "radius", type: "string", default:'118%',des: "仪表盘半径",},
                    {name: "color", type: "array", des: "仪表盘颜色,[进度条颜色,仪表盘颜色,标题颜色]",required:true},
                    {name: "fontSize", type: "string",des: "仪表盘标题字体大小",required:true},
                    {name: "percent", type: "number",des: "仪表盘进度",required:true},
                    {name: "description", type: "string", des: "仪表盘标题",required:true},
                    {name: "width", type: "string", default: "100%", des: "图表宽度，也可以是px或num"},
                    {name: "height", type: "string", default: "200px", des: "图表高度"}
                ]}/>
            </div>
        );
    }
}