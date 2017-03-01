import React from 'react';
import {COLOR} from '../../core/echarts.js'
import Chart from "./Chart.jsx";

/**
 @class SimpleBar
 @extends React.Component
 @constructor
 @param data {Array} 对应数据值，如：[{value:335, name:'cx-4'},{value:310, name:'雪弗兰'},{value:234, name:'福特'}]
 @return SimpleBar 返回SimpleBar组件
 */
export default class SimpleBar extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.chart = null;
        if (!props.data)
            return;
        let _yAxisData = props.data.joinKey("name");
        this.state = {
            option: {
                color: COLOR.FRIST,
                tooltip: {
                    trigger: 'axis',
                    axisPointer : {
                        type : 'none'
                    }
                    //position: ['36%', '32%']
                },
                grid: {
                    top: '0',
                    left: '13%',
                    right: '14%',
                    bottom: '0',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show: false
                },
                yAxis: {
                    type: 'category',
                    data: _yAxisData,

                },
                series: [
                    {
                        name: '点击量',
                        type: 'bar',
                        barWidth: 20,
                        data: props.data
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
            this.chart.setOption({
                yAxis: {data: props.data.joinKey("name")},
                series: [{data: props.data}]
            });
        }
    }
}