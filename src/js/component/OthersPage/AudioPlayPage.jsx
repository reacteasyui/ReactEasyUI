import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import AudioPlay from "../../plugin/Others/AudioPlay.jsx";

export default class AudioPlayPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            playID:null
        }
    }

    clickCallback(params) {
        this.setState({
            playID:params
        })
    }
    render() {
        let _this = this;
        return (
            <div className="audio-play-page">
                <h1>AudioPlay</h1>
                <p>带时长的音频组件。注：多个音频组件同时存在时，可将clickCallback获得的参数赋给playID，实现点击播放时其他音频文件暂停</p>
                <Demo title="实例" component={<AudioPlay
                    url="http://www.w3school.com.cn/i/song.mp3"
                    playID={_this.state.playID}
                    size={0.8}
                    clickCallback={_this.clickCallback.bind(this)}
                />}>
                    {`<AudioPlay
    url="http://www.w3school.com.cn/i/song.mp3"
    playID={_this.state.playID}
    size={0.8}
    clickCallback={_this.clickCallback.bind(this)}
/>`}
                </Demo>
                <Section data={[
                    {name: "url", type: "string", required: true, des: "播放音频的地址"},
                    {name: "playID", type: "string", default:"null", des: "点击播放时clickCallback接收到的params赋给playID,与clickCallback来实现多音频存在时，最多一个处于播放状态。"},
                    {name: "size", type: "number||string", default:"1", des: "图形的缩放比例"},
                ]}/>
                <Section title="回调方法" method="clickCallback(params)" data={[
                    {name: 'clickCallback', type: 'object', des: 'params是AudioPlay点击播放时的回调函数接收到的组件的随机id。将prams赋给playID，可使点击播放时其他音频组件处于暂停状态，实现不会出现多个音频处于播放状态的功能'},
                ]}/>
            </div>);
    }
}