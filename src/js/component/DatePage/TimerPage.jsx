import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import Timer from "../../plugin/Date/Timer.jsx";

export default class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    past(time){
        /*console.log(time);*/
    }

    render() {
        return (
            <div className="loading-page">
                <h1>Timer</h1>
                <p>带有定时触发功能的时钟组件</p>
                <Demo title="实例" component={<Timer
                    color="#09f"
                    fontSize="14px"
                    margin="10px"
                    timeInterval="3000"
                    callback={this.past.bind(this)}
                />}>
                    {`<Timer
    color="#09f"
    fontSize="14px"
    margin="10px"
    timeInterval="3000"
    callback={this.past.bind(this)}
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: "color", type: "string", des: "时间的字体颜色"},
                    {name: "fontSize", type: "string", des: "时间的字体大小"},
                    {name: "margin", type: "string",default:"5px", des: "日期与时间的间隔大小"},
                    {name: "timeInterval", type: "string", default: "0", des: "调用回调函数的时间间隔,必须为1000的倍数，如3000"}
                ]}/>
                <Section title="回调方法" method="callback()" data={[
                    {name: 'callback', type: 'object', des: '当走过的时间为timeInterval的倍数时，调用callback函数。callback接受的参数为调用callback的次数'},
                ]}/>
            </div>
        );
    }
}