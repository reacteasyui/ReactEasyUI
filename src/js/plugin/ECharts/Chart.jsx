import React from 'react';
import ReactDOM from 'react-dom';
import "../../lib/macarons_dma.js";

/**
 @class Chart
 @extends React.Component
 @constructor
 @param width {Number} 画布占宽，单位：px
 @param height {Number} 画布占高，单位：px
 @param option {Object} 图表参数，见官网实例  http://echarts.baidu.com/examples.html
 @return {Component} 返回Chart组件
 */
export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: props.option
        };
        this.myChart = null;
        this.chartID = "chart_" + ~~(Math.random() * 100000);
    }

    static defaultProps = {};

    render() {
        const divStyle = {
            width: this.props.width,
            height: this.props.height
        };
        return (<div>
            <div id={this.chartID} style={divStyle}></div>
            {this.state.option ? "" : "暂无数据"}
        </div> );
    }

    componentDidMount() {
        let _this = this;
        _this.myChart = echarts.init(document.getElementById(this.chartID), "macarons");
        // _this.setState({
        //     option: _this.props.option
        // }, ()=> {
        _this.myChart.setOption(_this.state.option);
        // 如果有点击回调
        if (_this.props.clickCallback) {
            _this.myChart.on('click', (params)=> {
                _this.props.clickCallback(params);
            })
        }
        if (_this.props.unSelect) {
            _this.myChart.on('legendselectchanged', (params)=> {
                _this.props.unSelect(params);
            })
        }
        if (_this.props.mouseoverCallback) {
            _this.myChart.on('mouseover', (params)=> {
                _this.props.mouseoverCallback(params);
            })
        }
        if (_this.props.mouseoutCallback) {
            _this.myChart.on('mouseout', (params)=> {
                _this.props.mouseoutCallback(params);
            })
        }
        //把图表对象返回给父级
        if (_this.props.getChart)
            _this.props.getChart(_this.myChart);
        //})
    }

    componentWillReceiveProps(props) {
        var _this = this;
        const {option} = props;

        _this.setState({
            option: option
        }, ()=> {
            _this.myChart.setOption(_this.state.option);
            // _this.myChart.clear();
            if (!_this.state.option.series.length || _this.state.option.series[0].type == "scatter") {
                _this.myChart.clear();
            }
            _this.myChart.setOption(this.state.option);
        });
    }

}