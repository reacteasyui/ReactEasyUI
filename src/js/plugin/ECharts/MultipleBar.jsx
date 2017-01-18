import React from 'react';
import {Charts} from "../../core/util";
import {COLOR,GRID} from '../../core/echarts.js'
import Chart from "./Chart.jsx";

/**
 * 水平方向柱状图
 @class MultipleBar
 @extends React.Component
 @constructor
 @param name {Array} 统计纬度，如：["点击量","点击率"]
 @param [color=蓝色] {Array} 传入色值编码，如：["#000000","#ffffff"]
 @param data {Array} 对应数据值，如：[{value:50, name:'这是一个项目',rate:10 },{value:100, name:'这是二个项目',rate:2 }]
 @return MultipleBar 返回MultipleBar组件
 */
export default class MultipleBar extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.chart = null;
        if (!props.data)
            return;
        let _yAxisData = props.data.joinKey("name"),
            _data = props.data.joinKey("rate");
        this.state = {
            option: {
                backgroundColor: COLOR.BACKGROUND,
                color: props.color,
                animation: false,
                tooltip: {
                    trigger: 'axis',
                    formatter: function (p) {
                        //console.log(p);
                        return p[0].name + '<br />' + p[1].seriesName + ':' + p[1].value + '%<br />' + p[2].seriesName + ':' + (''+p[2].value).formatNumber();
                    },
                    axisPointer: {
                        type: 'none'
                    }
                },
                grid: GRID.BAR,
                xAxis: [{
                    type: 'value',
                    splitLine: {show: false},
                    axisLabel: {
                        show: true,
                    }
                }, {
                    type: 'value',
                    splitLine: {show: false},
                    axisLabel: {show: false}
                }],
                yAxis: {
                    type: 'category',
                    splitLine: {show: false},
                    axisLabel: {show: false},
                    data: _yAxisData,
                },
                dataZoom: [{
                    type: 'slider',
                    show: true,
                    //handleIcon: "none",
                    showDetail: false,
                    showDataShadow: false,
                    start: 100 - Charts.setDataZoomEnd(props.data.length, 3),
                    end: 100,
                    top: 10,
                    width: 10,
                    height: "90%",
                    orient: "vertical",
                    zoomLock: true
                }],
                /*dataZoom : {
                 show : true,
                 realtime : true,
                 showDetail:false,
                 orient: 'vertical',   // 'horizontal'
                 //x: '60%',
                 //y: 280,
                 width: 10,
                 //height: 10,
                 //backgroundColor: 'rgba(221,160,221,0.5)',
                 //dataBackgroundColor: 'rgba(138,43,226,0.5)',
                 //fillerColor: 'rgba(38,143,26,0.6)',
                 //handleColor: 'rgba(128,43,16,0.8)',
                 //xAxisIndex:[],
                 //yAxisIndex:[],
                 start : 100 - Charts.setDataZoomEnd(props.data.length, 5.5),
                 end : 100,
                 zoomLock:true,
                 },*/
                series: [
                    {
                        name: props.name[1],
                        type: 'bar',
                        barWidth: 20,
                        stack: 'group',
                        label: {
                            normal: {
                                show: true,
                                position: [5, -18],//'insideRight',
                                textStyle: {color: COLOR.AXISTEXT},
                                formatter: '{b}'//'{b} ({a}:{c})'
                            }
                        },
                        itemStyle: {normal: {borderColor: props.color[0], color: props.color[0]}},
                        data: _data
                    },
                    {
                        name: props.name[1],
                        type: 'bar',
                        barWidth: 20,
                        stack: 'group',
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle: {color: COLOR.AXISTEXT},
                                formatter: '{c}%'
                                // formatter: (p)=> {
                                //     //console.log(p);
                                //     return p.data.rate + "%";
                                // }
                                //'{b} ({a}:{c})'
                            }
                        },
                        itemStyle: {normal: {borderColor: props.color[0], color: props.color[0]}},
                        data: _data
                    },
                    {
                        name: props.name[0],
                        type: 'bar',
                        barWidth: 20,
                        xAxisIndex: 1,
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle: {color: COLOR.AXISTEXT},
                                formatter: function(p){
                                    return (''+p.data.value).formatNumber();
                                }
                            }
                        },
                        itemStyle: {normal: {borderColor: props.color[1], color: props.color[1]}},
                        data: props.data
                    }
                ]
            }
        };
    }

    static defaultProps = {
        name: ["点击量", "点击率"],
        color: [COLOR.THIRD[0], COLOR.FRIST[0]],
        width: "100%",
        height: "300px"
    }

    getChart(chart) {
        this.chart = chart;
    }

    render() {
        let _this = this, {width, height, data}=_this.props;
        //console.log(JSON.stringify(_this.state.option));
        return (<div>
            {data ?
                <Chart
                    width={width}
                    height={height}
                    option={_this.state.option}
                    getChart={_this.getChart.bind(this)}
                /> : <div className='noResult'>暂无数据</div>
            }
        </div>);
    }

    //再次渲染时候重绘组件
    componentWillReceiveProps(props) {
        if (props && props.data) {
            let _option = this.state.option;
            _option.yAxis.data = props.data.joinKey("name");
            _option.series[0].data = props.data;
            _option.series[1].data = props.data.joinKey("rate");
            //_option.dataZoom[1].start = 100 - Charts.setDataZoomEnd(props.data.length, 3);
            _option.dataZoom[0].start = 100 - Charts.setDataZoomEnd(props.data.length, 3);
            // this.chart.setOption({
            //     yAxis: {data: props.data.joinKey("name")},
            //     series: [{data: props.data}, {data: props.data}]
            // });
        }
    }
}