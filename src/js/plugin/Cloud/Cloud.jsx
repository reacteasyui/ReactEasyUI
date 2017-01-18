import React from 'react';
import Domain from "../../core/Domain";
/**
 @class Cloud
 @extends React.Component
 @constructor
 @param width {Number} 画布占宽，单位px
 @param height {Number} 画布占高，单位px
 @param shape {String} 字符云图表形状
 @param data {Object} 字符数据集
 @return {Component} 返回Cloud组件
 */
export default class Cloud extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            option: {
                series: [{
                    type: 'wordCloud',
                    gridSize: 20,
                    sizeRange: [12, 50],
                    rotationRange: [-90, 90],
                    shape: props.shape || 'circle',
                    textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' + [
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160)
                                    ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 0,
                            shadowColor: ''
                        }
                    },
                    data: props.data || null,
                }]
            }
        };
        this.cloudID = "cloud_" + ~~(Math.random() * 100000);
        this.myCloudChart = null;
    }

    render() {
        const divStyle = {
            width: this.props.width,
            height: this.props.height
        };
        return (<div>
            <div id={this.cloudID} style={divStyle}></div>
        </div> );
    }

    componentDidMount() {
        let _this = this,
            URL = "http://" + new Domain().staticUrl() + "/ReactUI/plugin/";
        //$.getScript(URL + "echartsWordcloud.min.js", function () {
        let callback = function () {
            //window.echarts.ECHARTS_WORDCLOUD = true;
            _this.myCloudChart = echarts.init(document.getElementById(_this.cloudID));
            _this.myCloudChart.setOption(_this.state.option);
            // let option = _this.state.option;
            // option.series.data = _this.props.data;
            // _this.setState({
            //     option: option,
            // }, ()=> {
            //     _this.myCloudChart.setOption(_this.state.option);
            // })
        }
        //});
        //if (!window.echarts.ECHARTS_WORDCLOUD)
        !window["echarts-wordcloud"] ?
            $.ajax({
                type: 'GET',
                url: URL + "echartsWordcloud.min.js",
                success: callback,
                dataType: 'script',
                ifModified: true,
                cache: true
            }) : callback();
    }

    componentWillReceiveProps(props) {
        let _this = this,
            {shape, data} = props,
            option = _this.state.option;
        option.series.data = data;

        _this.setState({
            option: option,
        }, ()=> {
            _this.myCloudChart.setOption(_this.state.option);
        });
    }

    componentWillUnmount() {
        let _this = this;
        if (_this.myCloudChart && !_this.myCloudChart.isDisposed()) {
            _this.myCloudChart.dispose();
        }
    }
}