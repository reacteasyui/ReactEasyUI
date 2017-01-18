import React from 'react';

/**
 @class Loading
 @extends React.Component
 @constructor
 @param [height] {Number&String} 动画占高，默认300
 @return {Component} 返回Loading组件
 */

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static defaultProps = {
        height: 300,
    }


    render() {
        const style = {
            paddingTop: (this.props.height-38)/2 +"px",
            paddingBottom:(this.props.height-38)/2 + "px"
        },bounceStyle={
            background:this.props.color,
        };
        return (<div className='spinner' style={style}>
                <div className="bounce1" style={bounceStyle}></div>
                <div className="bounce2" style={bounceStyle}></div>
                <div className="bounce3" style={bounceStyle}></div>
        </div>)
    }
}