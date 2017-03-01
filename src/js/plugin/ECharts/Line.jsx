import React from 'react';
import Chart from "./Chart.jsx";
import {COLOR,GRID} from '../../core/echarts.js'

/**
 @class Line
 @extends React.Component
 @constructor
 @param data {Object} 对应数据值，如：data:{
                            name:['苹果','桃子'],
                            xData:['01-10','02-10','03-10','04-10','05-10'],
                            yData:[
                                [10,15,12,18,13,20],
                                [8,13,10,16,11,18]
                            ]
                        }
 @param isShowMax {Boolean} 是否显示最大值 true：显示，false：不显示（默认）
 @param isSmooth {Boolean} 折线是否平滑曲线显示 true：平滑显示，false：直线显示（默认）
 @return Line 返回Line组件
 */

export default class Line extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            data:props.data,
            option : {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                color:props.color?props.color:[COLOR.SECOND,COLOR.THIRD,COLOR.FRIST],
                legend: {
                    right:'4%',
                    itemWidth:10,
                    itemHeight:10,
                    data: []
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine:{
                        lineStyle:{
                            color:'#D1E1E9'
                        }
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLine:{
                        show:false
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
                        name: '',
                        type: 'line',
                        symbol:'none',
                        smooth:props.isSmooth || false,
                        markPoint: {
                            symbol:'rect',
                            symbolSize:(value,params)=>{
                                var str = params.value.toString();
                                var len = str.length;
                                if(props.isShowMax){
                                    return [8*len+10,20]
                                }else{
                                    return 0
                                }
                            },
                            symbolOffset:[0,-15],
                            data: [
                                {type: 'max', name: '最大值'}
                            ],
                            itemStyle:{
                                normal:{
                                    color:props.color?props.color[0]:[COLOR.SECOND]
                                },
                                emphasis:{
                                    color:props.color?props.color[0]:[COLOR.SECOND]
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
                                        return (''+p.value).formatNumber();
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
                        data: []
                    },
                    {
                        name: '',
                        type: 'line',
                        symbol:'none',
                        smooth:props.isSmooth || false,
                        markPoint: {
                            symbol:'rect',
                            symbolSize:(value,params)=>{
                                var str = params.value.toString();
                                var len = str.length;
                                if(props.isShowMax){
                                    return [8*len+10,20]
                                }else{
                                    return 0
                                }
                            },
                            symbolOffset:[0,-15],
                            data: [
                                {type: 'max', name: '最大值'}
                            ],
                            itemStyle:{
                                normal:{
                                    color:props.color?props.color[1]:[COLOR.THIRD]
                                },
                                emphasis:{
                                    color:props.color?props.color[1]:[COLOR.THIRD]
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
                                        return (''+p.value).formatNumber();
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
                        data: []
                    },
                    {
                        name: '',
                        type: 'line',
                        symbol:'none',
                        smooth:props.isSmooth || false,
                        markPoint: {
                            symbol:'rect',
                            symbolSize:(value,params)=>{
                                var str = params.value.toString();
                                var len = str.length;
                                if(props.isShowMax){
                                    return [8*len+10,20]
                                }else{
                                    return 0
                                }
                            },
                            symbolOffset:[0,-15],
                            data: [
                                {type: 'max', name: '最大值'}
                            ],
                            itemStyle:{
                                normal:{
                                    color:props.color?props.color[2]:[COLOR.FRIST]
                                },
                                emphasis:{
                                    color:props.color?props.color[2]:[COLOR.FRIST]
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
                                        return (''+p.value).formatNumber();
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
                        data: []
                    }
                ]
            },
        };
    }

    static defaultProps = {
        width: "100%",
        height: "400px",
        data:null
    };

    getChart(chart) {
        this.chart = chart;
    }

    givLineData(){
        let _this = this,
            _data = _this.state.data,
            _option = _this.state.option;
        if(_data){
            //_option.legend.data = _data.name;
            _option.xAxis.data = _data.xData;
            _data.name.map((r,i)=>{
                _option.legend.data[i] = {
                    name:r,
                    icon:'rect'
                };
                _option.series[i].name = r;
                _option.series[i].data = _data.yData[i]
            });
            if(_data.name.length == 1){
                _option.series.splice(1,2);
            }else if(_data.name.length ==2){
                _option.series.splice(2,1);
            }
            _this.setState({
                data:_data,
                option:_option
            })
        }
    }
    render() {
        let _this = this,{width,height,chartName} = _this.props,_data = _this.state.data;
        return (<div className={`re-line-chart ${chartName?chartName:''}`}>
            <Chart
                width={width}
                height={height}
                option={_this.state.option}
                getChart={_this.getChart.bind(this)}
            />
        </div>);
    }

    componentWillReceiveProps(props){
        let _this = this;
        _this.setState({
            data:props.data,
        },()=>{
            _this.givLineData();
        });
    }
    componentWillMount() {
        let _this = this;
        _this.givLineData();

    }
}