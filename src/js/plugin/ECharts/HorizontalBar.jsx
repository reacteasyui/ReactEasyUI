import React from 'react';
import {Charts} from "../../core/util";
import {COLOR,GRID} from '../../core/echarts.js'
import Chart from "./Chart.jsx";

/**
 * 水平方向柱状图
 @class HorizontalBar
 @extends React.Component
 @constructor
 @param name {[String,String]} 统计纬度
 @param rate {bool} 是否展示率
 @param [color=蓝色] {String} 传入色值编码，如：#000000
 @param data {Array} 对应数据值，如：[{value:50, name:'这是一个项目' },{value:100, name:'这是二个项目' }]
 @return HorizontalBar 返回HorizontalBar组件
 */
export default class HorizontalBar extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.chart = null;
        if (!props.data)
            return;
        let _yAxisData = props.data.joinKey("name"),
            _color = props.color ? [props.color] : COLOR.FRIST;
        let cloneArr = Array.from ? Array.from(props.data.clone(), r=> {
            r.t = r.value;
            r.value = 0;
            return r;
        }) :
            (()=> {
                let _a = props.data.clone();
                for (let i = 0, len = _a.length; i < len; i++) {
                    _a.t = _a.value;
                    _a.value = 0;
                }
                return _a;
            })();
        this.state = {
            option: {
                backgroundColor: COLOR.BACKGROUND,
                color: _color,
                animation: false,
                tooltip: {
                    trigger: 'axis',
                    //formatter: "{b}<br>{c}"
                    axisPointer: {
                        type: 'none'
                    },
                    formatter: function (p) {
                        let _f = "";
                        if (p[0].data) {
                            _f = p[0].data.name + '<br />' + props.name[0] + ':' + (''+p[0].data.value).formatNumber();
                            if (props.rate && p[0].data.rate && props.name[1]) {
                                _f += '<br />' + props.name[1] + ':' + p[0].data.rate + "%";
                            }else if(props.rate && p[0].data.rate){
                                _f = p[0].data.name +'<br />' + props.name[0] + ':' + p[0].data.rate + "%";
                            }
                            // else {
                            //     _f = p[0].data.name + '<br />' + props.name[0] + ':' + p[0].data.value.formatNumber();
                            // }
                        }
                        return _f;
                    },
                },
                grid: GRID.BAR_VERTICAL,
                xAxis: {
                    type: 'value',
                    splitLine: {show: false},
                    //minInterval: 1,
                    // axisLabel: {
                    //     formatter: (p)=> {
                    //         return ~~(p / 2);
                    //     }
                    // }
                },
                yAxis: {
                    type: 'category',
                    axisLabel: {show: false},
                    data: _yAxisData,
                },
                dataZoom: [{
                    type: 'slider',
                    show: true,
                    //handleIcon: "none",
                    showDetail: false,
                    showDataShadow: false,
                    start: 100 - Charts.setDataZoomEnd(props.data.length, 5.5),
                    end: 100,
                    top: 10,
                    right:10,
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
                 start : 100 - Chart.setDataZoomEnd(props.data.length, 5.5),
                 end : 100,
                 zoomLock:true,
                 },*/
                calculable:true,
                series: [
                    {
                        name: props.name[0],
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
                        itemStyle: {normal: {borderColor: _color}},
                        data: props.data
                    },
                    {
                        name: props.name[0],
                        type: 'bar',
                        barWidth: 20,
                        stack: 'group',
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle: {color: COLOR.AXISTEXT},
                                formatter: function (p) {
                                    /*console.log(p);*/
                                    let value;
                                    if (p.data.t) {
                                        value = ('' + p.data.t).formatNumber();
                                    } else {
                                        value = ('' + p.data.value).formatNumber();
                                    }
                                    return props.rate ? p.data.rate + "%" : value;
                                }
                            }
                        },
                        itemStyle: {normal: {borderColor: _color}},
                        data: cloneArr
                    }
                ]
            }
        };
    }

    static defaultProps = {
        //orient: "horizontal",//vertical
        rate: false,
        width: "100%",
        height: "290px",
        name: ["点击量"]
    }

    getChart(chart) {
        this.chart = chart;
    }

    render() {
        let _this = this, {width, height, data}=_this.props;
        return (<div>
            {data ?
                <Chart
                    width={width}
                    height={height}
                    option={_this.state.option}
                    getChart={_this.getChart.bind(this)}
                /> : <div className='re-no-result'>暂无数据</div>
            }
        </div>);
    }

    //再次渲染时候重绘组件
    componentWillReceiveProps(props) {
        if (props && props.data) {
            let _option = this.state.option;
            _option.yAxis.data = props.data.joinKey("name");
            _option.series[0].data = props.data;
            let cloneArr = Array.from ? Array.from(props.data.clone(), r=> {
                r.t = r.value;
                r.value = 0;
                return r;
            }) :
                (()=> {
                    let _a = props.data.clone();
                    for (let i = 0, len = _a.length; i < len; i++) {
                        _a.t = _a.value;
                        _a.value = 0;
                    }
                    return _a;
                })();
            _option.series[1].data = cloneArr;
            //_option.dataZoom[1].start = 100 - Charts.setDataZoomEnd(props.data.length, 5.5);
            _option.dataZoom.start = (100 - Charts.setDataZoomEnd(props.data.length, 5.5)) <= 1 ? 5 : 100 - Charts.setDataZoomEnd(props.data.length, 5.5) <= 1 ? 5 : Charts.setDataZoomEnd(props.data.length, 5.5) ;
            // this.chart.setOption({
            //     yAxis: {data: props.data.joinKey("name")},
            //     series: [{data: props.data}, {data: props.data}]
            // });
        }
    }
}