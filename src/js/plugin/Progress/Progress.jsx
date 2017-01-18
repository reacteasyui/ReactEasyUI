import React from 'react';
import * as BS from 'react-bootstrap';

/**
 @class Progress
 @extends React.Component
 @constructor
 @param now {Number} 进度条百分比的值 如：80
 @param title {String} 进度条的提示文字 如："正在下载："
 @return {Component} 返回Progress组件
 */
export default class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now :+props.now || 0,
            cacheNow:props.now || 0,
            title:props.title || '',
        }
    }

    static defaultProps = {
        width:"80%",
        title:''
    };

    render() {
        let _this = this,{width,height} = _this.props;
        let style = {
            width:width,
            height:height
        };
        return(<div style={style}>
            <span className="tip">{_this.state.title}</span>
            <BS.ProgressBar active now={_this.state.now} />
        </div>)
    }

    componentWillReceiveProps(props) {
        let _this = this;
        if(props && props.now){
            _this.setState({
                now:+props.now,
                title:props.title || ''
            });
        }
    }
    
}
