import React from 'react';
import Loading from "../Progress/Loading.jsx";
/**
 @class IframeLoad
 @extends React.Component
 @constructor
 @param url {String} iframe加载页面的网址，如：url:'http://www.baidu.com'
 @return {Component} 返回IframeLoad组件
 */
export default class IframeLoad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            url:props.url
        }
    }

    onLoad(){
        this.setState({
            isLoading:false
        });
    }

    static defaultProps = {
        width: "100%",
        height: "400px"
    };
    render() {
        let _this = this,{width,height} = _this.props;
        let iframeStyle = {
            width:width,
            height:height,
            position:'relative',
            margin:0
        };
        const loadingStyle = {
            position:'absolute',
            width:'100%',
            height:'100%',
            top:'0'
        };
        return (
            <div className="re-iframe-wrapper" style={iframeStyle}>
                {
                    _this.state.isLoading&&(<div style={loadingStyle}><Loading /></div>)
                }
                <iframe src={_this.state.url}
                        width="100%"
                        height="100%"
                        onLoad={_this.onLoad.bind(this)}
                ></iframe>
            </div>
        );
    }
}