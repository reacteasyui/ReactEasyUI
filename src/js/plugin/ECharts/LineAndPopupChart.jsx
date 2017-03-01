import React from 'react';
import ReactDOM from 'react-dom';
import * as BS from 'react-bootstrap';
import Chart from "./Chart.jsx";
import {COLOR} from "../../core/echarts"

/**
 @class LineAndPopupChart
 @extends React.Component
 @constructor
 @param name {String} 统计纬度
 @param data {Object} 对应数据值，如：data:{timeData:['2016.05.26', '2016.06.26', '2016.07.26'],data:[200, 210, 170, 385, 300,300]}
 @param colorIndex {Number} 折线颜色数组下标，如：0，红色；1，蓝色；2，绿色；   默认0
 @param isShowMax {Boolean} 是否显示最大值
 @return LineAndPopupChart 返回LineAndPopupChart组件
 */

export default class LineAndPopupChart extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.chart = null;
        this.lineColor = [COLOR.SECOND,COLOR.FRIST,COLOR.THIRD];//蓝红绿
        this.state = {
            pop:false,
            colorIndex : props.colorIndex || 0,
            data:props.data || null,
            isShowMax: props.isShowMax || false,
            option : {
                title: {
                },
                color:COLOR.SECOND,
                tooltip: {
                    trigger: 'axis',
                    //formatter: '{b0}<br />{a0} : {c0}'
                },
                legend: {
                    /*left: 'left',
                     data: ['2的指数', '3的指数']*/
                },
                xAxis: {
                    type: 'category',
                    splitLine: {show: false},
                    boundaryGap: false,
                    data: [],
                    axisLine:{
                        lineStyle:{
                            color:'#D1E1E9'
                        }
                    },
                    triggerEvent :true
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                    min:0,
                    //max:50,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:['#D1E1E9'],
                            type:'dashed'
                        }
                    },
                    splitNumber:5
                },
                series: [
                    {
                        name: props.name,
                        type: 'line',
                        smooth:false,
                        symbol:'circle',
                        symbolSize:10,
                        itemStyle:{
                            normal:{
                                borderWidth:3,
                                borderColor:'#fff'
                            }
                        },
                        markPoint: {
                            symbol:'rect',
                            symbolSize:(value,params)=>{
                                var str = params.value.toString();
                                var len = str.length;
                                if(this.state.isShowMax){
                                    return [8*len+10,20]
                                }else{
                                    return 0;
                                }
                            },
                            symbolOffset:[0,-15],
                            data: [
                                {type: 'max', name: '最大值'}
                            ],
                            itemStyle:{
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
                                        let value = (''+p.value).formatNumber();
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
                        data: [],
                    },
                ]
            }
        }
    }

    static defaultProps = {
        width: "100%",
        height: "400px"
    };

    giveDataToOption(){
        let _this = this,
            _data = _this.state.data,
            _option = _this.state.option;
        if(_data){
            _option.xAxis.data = _data.timeData;
            /*_data.timeData &&  _data.timeData.map((r,i)=>{
             if(i == 0){
             _option.xAxis.data[i] = {
             value : r,
             textStyle:{
             align:'left'
             }
             }
             }else if(i==(_data.timeData.length-1) && _data.timeData.length>=2){
             _option.xAxis.data[i] = {
             value : r,
             textStyle:{
             align:'right'
             }
             }
             }else{
             _option.xAxis.data[i] = r
             }
             });*/
            _option.series[0].data = _data.data;
            _option.color = _this.lineColor[_this.state.colorIndex];
            _this.setState({
                option:_option,
            })
        }
    }

    getChart(chart) {
        this.chart = chart;
    }

    closePop(){
        this.setState({
            pop:false
        })
    }

    clickCallback(params){
        let _this = this;
        if (params.componentType === 'xAxis' || params.componentType === 'series') {
            _this.setState({
                pop:true,
            });
            if(_this.props.clickCallback){
                _this.props.clickCallback(params.componentType === 'xAxis'?params.value:params.name);
            }
        }
    }

    render() {
        let _this = this, {width,height,data} = _this.props;
        return (
            <div className="re-line-pop-wrapper">
                <div className={`re-pop-wrapper ${_this.state.pop ? '' : 'hide'}`}>
                    <div className="re-pop-title">
                        <span>项目名称</span>
                        <i onClick={_this.closePop.bind(this)}>×
                        </i>
                    </div>
                    <div className="re-pop-content re-scroll-bar">
                        {this.props.format()}
                    </div>
                </div>
                <Chart
                    width={width}
                    height={height}
                    option={_this.state.option}
                    clickCallback={_this.clickCallback.bind(this)}
                    getChart={_this.getChart.bind(this)}
                />
            </div>
        );
    }

    componentWillMount(props) {
        let _this = this;
        _this.giveDataToOption();
    }

    componentWillReceiveProps(props){
        let _this = this;
        _this.setState({
            data:props.data
        },()=>{
            _this.giveDataToOption();
        });
    }
}