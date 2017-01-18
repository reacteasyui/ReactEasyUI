import React from 'react';
import ReactDOM from 'react-dom';
import * as BS from 'react-bootstrap';
import Chart from "./Chart.jsx";
import {COLOR,GRID} from '../../core/echarts.js'

/**
 @class TwoYLineChart
 @extends React.Component
 @constructor
 @param name {Array} 折线图系列名称，如：name:['点击量','点击率']
 @param data {Array,Array,Array} 对应数据值，如：data: {timeData: ['2016.06.01', '2016.07.01'],
             leftData: [12000, 23200],rightData:[7,21]},
 @param xLabelDirection {Number} x轴标签的显示方向 0：横向 1:竖向
 @param isShowArea {Number} 右侧的折线是否显示填充颜色 0：不填充 1:填充
 @return TwoYLineChart 返回TwoYLineChart组件
 */

export default class DoubleYLineChart extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            isShowArea:props.isShowArea || 0,
            xLabelDirection:props.xLabelDirection || 0,
            data: props.data || null,
            option:{
                title : {
                },
                color:COLOR.TWO_YLINE,
                grid: {
                    bottom: 80,
                },
                toolbox: {
                },
                tooltip : {
                    trigger: 'axis',
                    formatter: function(p){
                        //console.log(p);
                        //return  p[0].name +'<br/>'+p[0].seriesName +':'+p[0].value.formatNumber()+'<br/>'+p[1].seriesName +':'+p[1].value+'%';//'{b0}<br />{a0} : '+(''+p.value).formatNumber()+'<br />{a1} : {c1}%';
                    }
                },
                legend: {
                    data:[],
                    x:'center',
                    y: 'bottom'
                },
                dataZoom: [
                ],
                xAxis : {
                    type : 'category',
                    boundaryGap : true,
                    axisLabel:{
                        /*formatter: function(p){
                            if(props.xLabelDirection){
                                var map = Array.prototype.map;
                                var arr = map.call(p, function(x) { return x.charCodeAt(0); });
                                console.log(arr);
                                var str='';
                                arr.map((r,i)=>{
                                    return str+=(String.fromCharCode(r)+' '+'<br />');
                                });
                                console.log(str);
                                return str;
                            }
                        },*/
                    },
                    data : []
                },
                yAxis: [
                    {
                        name: '',
                        type: 'value',
                        splitNumber:6,
                        splitLine:{
                            interval:1
                        },
                        axisLine:{
                            show:false
                        }
                    },
                    {
                        name: '',
                        type: 'value',
                        splitNumber:6,
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        splitLine:{
                            show:false
                        },
                        axisLine:{
                            show:false
                        }
                    }
                ],
                series: [
                    {
                        name:'点击量',
                        type:'line',
                        smooth:true,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        markArea: {
                            silent: true,
                            data: [[{
                                xAxis: '2009/9/12\n7:00'
                            }, {
                                xAxis: '2009/9/22\n7:00'
                            }]]
                        },
                        data:[]
                    },
                    {
                        name:'点击率',
                        type:'line',
                        yAxisIndex:1,
                        smooth:true,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle:{
                            normal:{
                                opacity:0
                            }
                        },
                        markArea: {
                            silent: true,
                            data: [[{
                                xAxis: '2009/9/10\n7:00'
                            }, {
                                xAxis: '2009/9/20\n7:00'
                            }]]
                        },
                        data:[]
                    }
                ]
            }

        };

    }

    static defaultProps = {
        width: "100%",
        height: "400px"
    };

    getChart(chart) {
        this.chart = chart;
    }


    giveLineData() {
        let _this = this,
            _data = _this.state.data,
            _option = _this.state.option;
        if(_this.state.isShowArea){
            _option.series[1].areaStyle.normal.opacity = 0.5;
        }
        _option.xAxis.data = _data.timeData;
        _option.legend.data = _this.props.name;
        _option.series[0].data = _data.leftData;
        _option.series[0].name = _this.props.name[0];
        _option.series[1].data = _data.rightData;
        _option.series[1].name = _this.props.name[1];
        _this.setState({
            option:_option
        });
    }

    render() {
        let _this = this, {width, height, chartName} = _this.props;
        return (<div className={`TwoYLineChart ${chartName?chartName:''}`}>
            <Chart
                width={width}
                height={height}
                option={_this.state.option}
                getChart={_this.getChart.bind(this)}
            />
        </div>)
    }

    componentWillReceiveProps(props) {
        let _this = this;
        if(props){
            _this.setState({
                isShowArea:props.isShowArea,
                xLabelDirection:props.xLabelDirection,
                data: props.data
            },()=>{
                _this.giveLineData();
            });
        }
    }

    componentWillMount(props) {
        let _this = this;
        _this.giveLineData();
    }
}