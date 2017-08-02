import React from 'react';
import {Charts} from "../../core/util";
import {COLOR,GRID} from '../../core/echarts.js'
import Chart from "./Chart.jsx";

export default class Gauge extends React.Component {
    constructor(props){
        super(props);
        this.chart = null;
        this.state = {
            option: {
                "toolbox": {
                    "show": false,
                    "feature": {
                        "mark": {
                            "show": true
                        },
                        "restore": {
                            "show": true
                        },
                        "saveAsImage": {
                            "show": true
                        }
                    }
                },
                series: [{
                    "name": "",
                    "type": "gauge",
                    "startAngle": props.angle ? props.angle[0] : 225, //总的360，设置180就是半圆
                    "endAngle": props.angle ? props.angle[1] : -45,
                    "center": props.position ? props.position : ["60%", "59%"], //整体的位置设置
                    "radius": props.radius || '118%',
                    "axisLine": {
                        "lineStyle": {
                            "width": props.barWidth || 16, //柱子的宽度
                            "color": [[props.percent, props.color[0]], [1, props.color[1]]] //0.298是百分比的比例值（小数），还有对应两个颜色值
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "show": false
                    },
                    "splitLine": {
                        "show": false
                    },
                    "pointer": {
                        "width": 4, //指针的宽度
                        "length": "80%", //指针长度，按照半圆半径的百分比
                    },
                    "title": {
                        "show": true,

                        "offsetCenter": [0, "50%"], //标题位置设置
                        "textStyle": { //标题样式设置
                            "color": props.color[2],
                            "fontSize": props.fontSize,
                            "fontFamily": "微软雅黑",
                        }
                    },
                    'itemStyle': {
                        normal: {
                            color: props.color[0]
                        }
                    },
                    "detail": {
                        "show": false
                    },
                    data: [{ //显示数据
                        "value": (props.percent * 1000/10),
                        'name': props.description
                    }],
                    //animationDurationUpdate: 1000
                }]
            }
        }
    }

    getChart(chart){
        this.chart = chart;
    }

    static defaultProps = {
        width:'100%',
        height:'200px'
    }

    render(){
        let _this = this,{width, height} = _this.props;
        return(<div>
            <Chart
                width={width}
                height={height}
                option={_this.state.option}
                getChart={_this.getChart.bind(this)}
            />
        </div>);
    }
}