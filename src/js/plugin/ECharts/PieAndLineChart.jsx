import React from 'react';
import ReactDOM from 'react-dom';
import * as BS from 'react-bootstrap';
import Chart from "./Chart.jsx";
import {COLOR,GRID} from '../../core/echarts'

/**
 @class PieAndLineChart
 @extends React.Component
 @constructor
 @param data {Array,Array} 对应数据值，如：data:{
                time:['2016.06.01','2016.07.01','2016.08.01','2016.09.01','2016.10.01'],
                data:[
                    {value:35,name:'测试1',lineData:[2,31,21,6,2]},
                    {value:65,name:'测试2',lineData:[12,21,15,6,20]},
                ]
            }
 @param name {String} 统计纬度
 @param isShowMax {Boolean} 是否显示最大值
 @param rate {Boolean} 是否是率
 @return PieAndLineChart 返回PieAndLineChart组件
 */

export default class PieAndLineChart extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            data:props.data || null,
            isShowMax: props.isShowMax || false,
            option : {
                tooltip: {
                    trigger: ['item','axis'],
                    //trigger: 'item',
                    //formatter: "{b}: {c}"
                    formatter:function(data){
                        let _data = data[0] ? data[0] : data,value;
                        value = props.rate ? (''+_data.value).formatNumber()+'%':(''+_data.value).formatNumber();
                        if(_data.componentSubType == 'pie'){
                            return _data.name+'<br/>'+props.name+'：'+ value;
                        }else{
                            return _data.name+'<br/>'+props.name+'：'+ value;
                        }

                    }
                },
                toolbox: {
                    show:false,
                },
                grid:{
                    right:'7%',
                    left:'7%',
                    top:'50%'
                },
                color:COLOR.DEFAULT,
                legend: {
                    orient: 'horizontal',
                    left:'20%',
                    top:'1%',
                    padding:[0,5,0,5],
                    itemWidth:10,
                    itemHeight:10,
                    textStyle:{
                        color:COLOR.AXISTEXT
                    },
                    data:[
                        {
                            name:'测试1',
                            icon:'rect'
                        },
                        {
                            name:'测试2',
                            icon:'rect'
                        },
                        {
                            name:'测试3',
                            icon:'rect'
                        },
                        {
                            name:'测试4',
                            icon:'rect'
                        }
                    ],
                    formatter: function (name) {
                        return echarts.format.truncateText(name, 280, '14px Microsoft Yahei');
                    },
                    tooltip: {
                        show: true
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine:{
                      lineStyle:{
                          width:2,
                          color:'#D1E1E9'
                      }
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    //interval: 50,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisLine:{
                        lineStyle:{
                            width:2,
                            color:'#D1E1E9'
                        }
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:['#D1E1E9'],
                            type:'dashed'
                        }
                    }
                },
                series: [
                    {
                        type:'pie',
                        radius:'20%',
                        center:['10%','20%'],
                        z:10,
                        label:{
                            normal:{
                                show:false
                            }
                        },
                        labelLine:{
                            normal:{
                                show:false
                            }
                        },
                        data:[
                        ]
                    },
                    {
                        type:'line',
                        name:'',
                        symbol:'none',
                        smooth:false,
                        lineStyle:{
                            normal:{
                                color:COLOR.DEFAULT[0]
                            }
                        },
                        data:[],
                        markPoint: {
                            symbol:'rect',
                            symbolSize:(value,params)=>{
                                var str = params.value.toString();
                                var len = str.length;
                                return [8*len+10,20]
                            },
                            symbolOffset:[0,-15],
                            data: props.isShowMax ? [{type: 'max', name: '最大值'}] : [],
                            itemStyle:{
                                normal:{
                                    color:COLOR.DEFAULT[0]
                                },
                                emphasis:{
                                    color:COLOR.DEFAULT[0]
                                }
                            },
                            label:{
                                normal:{
                                    show:props.isShowMax || false,
                                    textStyle:{
                                        fontSize:14,
                                        fontFamily:'Arial',
                                        color:COLOR.WHITE
                                    },
                                    formatter:function(p){
                                        let value = props.rate ? (''+p.value).formatNumber() +'%': (''+p.value).formatNumber();
                                        return value;
                                    }
                                },
                                emphasis:{
                                    show:props.isShowMax || false,
                                    textStyle:{
                                        fontSize:14,
                                        fontFamily:'Arial',
                                        color:COLOR.WHITE,
                                    }
                                }
                            }
                        },
                    },
                ]
            }

        }
    }

    static defaultProps = {
        width: "100%",
        height: "400px"
    };

    getChart(chart) {
        this.chart = chart;
    }

    giveDataToOption(){
        let _this = this,
            _data = _this.state.data,
            _option = _this.state.option;
        //console.log(_data);
        _option.xAxis.data = _data.timeData;
        let _pieData = [],_legendData = [];
        _data.data.map((r,i)=>{
            let _pie = {
                name:r.name,
                value:r.value
            };
            let _legend = {
                name:r.name,
                icon:'rect'
            };
            _pieData.push(_pie);
            _legendData.push(_legend);
        });
        _option.series[0].data = _pieData;
        _option.legend.data = _legendData;
        _option.series[1].data = _data.data[0].lineData;
        if(_this.state.isShowMax){
            _option.series[1].markPoint.data = [{type: 'max', name: '最大值'}];
        }
        _this.setState({
            data:_data,
            option:_option
        })

    }
    clickCallback(params){
        let _this = this,
            _index = params.dataIndex,
            _data = _this.state.data.data[_index].lineData;
        //console.log(_index);
        if(_this.props.isShowMax){
            _this.chart.setOption({
                series: [
                    {

                    },
                    {
                        lineStyle:{
                            normal:{
                                color:COLOR.DEFAULT[_index]
                            }
                        },
                        markPoint:{
                            itemStyle:{
                                normal:{
                                    color:COLOR.DEFAULT[_index]
                                },
                                emphasis:{
                                    color:COLOR.DEFAULT[_index]
                                }
                            },
                        },
                        data:_data
                    }
                ]
            });
        }else{
            _this.chart.setOption({
                series: [
                    {

                    },
                    {
                        lineStyle:{
                            normal:{
                                color:COLOR.DEFAULT[_index]
                            }
                        },
                        data:_data
                    }
                ]
            });
        }
    }

    render() {
        let _this = this;
        let {chartName,width,height }=_this.props;
        return (<div className={`pieAndLineChart ${chartName?chartName:''}`}>
            <Chart
                width={width}
                height={height}
                option={_this.state.option}
                clickCallback={_this.clickCallback.bind(this)}
                getChart={_this.getChart.bind(this)}
            />
        </div>);
    }

    componentWillMount(props) {
        let _this = this;
        _this.giveDataToOption();
    }
}