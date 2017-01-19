import React from 'react';

/**
 @class AudioPlay
 @extends React.Component
 @constructor
 @param url {String} 音频文件的地址
 @param size {String || Number} 播放和暂停图标的缩放比例，例：0.9
 @return {Component} 返回AudioPlay组件
 */

export default class AudioPlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url:props.url || '',
            isPlay:false,
            secNum:0
        };
        this.audioID = "audio_" + ~~(Math.random() * 100000);
    }

    static defaultProps = {
        size:1
    }

    switchState(){
        let _this = this;
        _this.setState({
            isPlay:!_this.state.isPlay
        },()=>{
            _this.playOrPause();
        })
    }

    playOrPause(){
        let _this = this,_id = '#'+_this.audioID;
        let audioDom = document.querySelector(_id);
        if(_this.state.isPlay){
            audioDom.play();
            if(_this.props.clickCallback){
                _this.props.clickCallback(_this.audioID);
            }
            audioDom.onended = function(){
                _this.setState({
                    isPlay:false
                });
            }
        }else{
            audioDom.pause();
        }
    }
    countTime(){
        let _this = this,_id = '#'+_this.audioID;
        let audioDom = document.querySelector(_id);
        let len = parseInt(audioDom.duration);
        if(len){
            _this.setState({
                secNum:len
            })
        }
    }

    render() {
        let _this = this,_state = _this.state.isPlay,{size}=_this.props;
        const style={
            transform:'scale('+size+','+size+')',
            WebkitTransform:'scale('+size+','+size+')',
        };
        return(<div className="audio">
            <div className="buttonWrapper" style={style} onClick={_this.switchState.bind(this)}>
                <div className={`${_state?'play':'pause'}`}></div>
            </div>
            <span>{_this.state.secNum}"</span>
            <audio src={_this.state.url} id={_this.audioID}>
            </audio>
        </div>)
    }
    componentDidMount(){
        let _this = this;
        setTimeout(function(){
            _this.countTime()
        },500)
    }
    componentWillReceiveProps(props){
        let _this = this;
        if(props.playID != _this.audioID){
            _this.setState({
                isPlay:false
            },()=>{
                _this.playOrPause();
            })
        }
    }
}