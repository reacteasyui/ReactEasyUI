import React from 'react';
import {Charts} from "Util";
import {COLOR,GRID} from '../../core/echarts.js'
import Chart from "./Chart.jsx";

/**
 * 垂直方向柱状图
 @class VerticalBar
 @extends React.Component
 @constructor
 @param name {String} 统计纬度
 @param [color=蓝色] {String} 传入色值编码，如：#000000
 @param data {Array} 对应数据值，如：[{name:"一线城市",value:"3967"},{name:"二线城市",value:"12238"},{name:"三线城市",value:8534},{name:"四线城市",value:7760}]
 @return VerticalBar 返回VerticalBar组件
 */
export default class VerticalBar extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.chart = null;
        if (!props.data)
            return;
        let _xAxisData = props.data.joinKey("name");
        this.state = {
            option: {
                color: props.color ? [props.color] : COLOR.FRIST,
                tooltip: {
                    trigger: 'axis',
                    axisPointer : {
                        type : 'none'
                    }
                },
                grid: GRID.VBAR,
                xAxis: {
                    type: 'category',
                    data: _xAxisData,
                },
                yAxis: {
                    type: 'value',
                    splitLine: {show: false}
                },
                dataZoom: [/*{
                 type: 'inside',
                 start: 0,
                 end: Charts.setDataZoomEnd(props.data.length, 5.5),
                 zoomLock: true
                 }, */{
                    type: 'slider',
                    show: props.data.length > 5,
                    //handleIcon: "none",
                    showDetail: false,
                    showDataShadow: false,
                    start: 0,
                    end: props.data.length > 5 ? 10 : 100,
                    height: 10,
                    bottom: 10,
                    //width: "90%",
                    zoomLock: true
                }],
                /*dataZoom : {
                 show : props.data.length > 5 ? true : false,
                 realtime : true,
                 showDetail:false,
                 //orient: 'vertical',   // 'horizontal'
                 //x: 0,
                 y: 280,
                 //width: 400,
                 height: 10,
                 backgroundColor: 'rgba(0,0,0,0.5)',
                 dataBackgroundColor: 'rgba(255,255,255,0.5)',
                 //fillerColor: 'rgba(38,143,26,0.6)',
                 //handleColor: 'rgba(128,43,16,0.8)',
                 //xAxisIndex:[],
                 //yAxisIndex:[],
                 start : 0,
                 end : props.data.length > 5 ? 10 : 100,
                 zoomLock:true,
                 },*/
                series: [
                    {
                        name: props.name,
                        type: 'bar',
                        barWidth: 40,
                        data: props.data
                    }
                ]
            }
        };
    }

    static defaultProps = {
        width: "100%",
        height: "300px",
        name: "点击量"
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
                /> : <div className='noResult'>暂无数据</div>
            }
        </div>);
    }

    //再次渲染时候重绘组件
    componentWillReceiveProps(props) {
        if (props && props.data) {
            let _option = this.state.option;
            _option.xAxis.data = props.data.joinKey("name");
            _option.series[0].data = props.data;
            //_option.dataZoom[0].end = Charts.setDataZoomEnd(props.data.length, 5.5);
            _option.dataZoom[0].show = props.data.length > 5 ? true : false;
            _option.dataZoom[0].end = props.data.length > 5 ? 10 : 100;
            /*this.chart.setOption({
             xAxis: {data: },
             series: [{data: props.data}]
             });*/
        }
    }
}