import React from 'react';
import {COLOR} from "../../core/echarts.js";
import Chart from "./Chart.jsx";

/**
 @class Pie
 @extends React.Component
 @constructor
 @param color {Array} 颜色,默认不传
 @param name {String} 统计纬度
 @param data {Array} 对应数据值，如：[{value:335, name:'固定位'},{value:310, name:'SEM'},{value:234, name:'RTB'}]
 @return Pie 返回Pie组件
 */
export default class Pie extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.chart = null;
        if (!props.data)
            return;
        let _legend = props.data.joinKey("name");
        this.state = {
            option: {
                color: props.color || COLOR.DEFAULT,
                tooltip: {
                    trigger: 'item',
                    formatter: function (p) {
                        if(p != 0){
                            let name= props.name ? props.name : '数值';
                            return p.name + '<br />' + name+':' + (''+p.value).formatNumber();
                        }
                    }
                    //formatter: "{b}<br>金额（元）:{c.formatNumber()}"
                },
                legend: {
                    left: "center",
                    top: "bottom",
                    icon: "circle",
                    selectedMode: false,
                    itemWidth: 10,
                    itemHeight: 10,
                    data: _legend//['固定位', 'SEM', 'RTB']
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['45%', '60%'],
                        avoidLabelOverlap: false,
                        hoverAnimation: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    fontSize: '18',
                                    fontWeight: 'bold'
                                },
                                formatter: function (params) {
                                    return params.dataIndex == 0 ? params.percent + "%" : "";
                                }
                            }
                        },
                        data: props.data//[335,310,234]
                    }
                ]
            }
        };
    }

    static defaultProps = {
        width: "100%",
        height: "200px"
    }

    getChart(chart) {
        this.chart = chart;
    }

    mouseoverCallback(params) {
        this.chart.setOption({
            series: [{
                label: {
                    normal: {
                        formatter: function (p) {
                            return p.dataIndex == params.dataIndex ? params.percent + "%" : "";
                        }
                    }
                }
            }]
        });
    }

    mouseoutCallback(params) {
        this.chart.setOption({
            series: [{
                label: {
                    normal: {
                        formatter: function (p) {
                            return p.dataIndex == 0 ? p.percent + "%" : "";
                        }
                    }
                }
            }]
        });
    }

    render() {
        let _this = this, {width, height, data}=_this.props;
        return (<div>
            {data ?
                <Chart
                    width={width}
                    height={height}
                    option={_this.state.option}
                    mouseoverCallback={_this.mouseoverCallback.bind(this)}
                    mouseoutCallback={_this.mouseoutCallback.bind(this)}
                    getChart={_this.getChart.bind(this)}
                /> : <div className='noResult'>暂无数据</div>
            }
        </div>);
    }

    //再次渲染时候重绘组件
    componentWillReceiveProps(props) {
        if (props && props.data) {
            this.chart.setOption({
                color: props.color || COLOR.DEFAULT,
                legend: {data: props.data.joinKey("name")},
                series: [{data: props.data}]
            });
        }
    }
}