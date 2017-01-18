import React from 'react';
import {COLOR} from "../../core/echarts";
import Chart from "./Chart.jsx";

/**
 @class Scatter
 @extends React.Component
 @constructor
 @param data {Object} 对应数据值，如：{click_add:6000000,
                                        avaData:[{xAxis: 180, name: "平均转化率"},{yAxis: 70, name: "平均线索量"}],
                                                平均数轴相关设置，如没有，则不显示平均数轴
                                        data:[{name:"女1性",data: [[164.4, 55.5]],click:300000}]}
 @param x,y {Object} 对应轴的名字和单位，如：{name:"阅读时间",measure:"秒"}
 @param changeSize [Boolean] 散点大小是否可变，与data中click_add 和 click相关
 @param toolboxPosition={[0,0,null,null]} [Array] toolbox的位置，对应["left","top","right","bottom"],数值，百分比或"center"/"right"/"top"...
 @return SimpleBar 返回SimpleBar组件
 */
export default class Scatter extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.chart = null;
        if (!props.data.data)
            return;
        let _series = props.data.data;
        if (_series.length) {
            _series.map((r, i)=> {
                r.type = "scatter";
                r.symbolSize = props.changeSize && props.data.click_add ? this.sizeFunction(r.click, props.data.click_add) : 10;
            });
            _series[0].markLine = {
                show: props.data.avaData,
                data: props.data.avaData || [],
                symbolSize: 0,
                label: {
                    normal: {
                        formatter: function (params) {
                            if (params.dataIndex == 0) {
                                return params.name + " : " + params.value + (props.y ? (props.y.measure || '' ) : '')
                            }
                            return params.name + " : " + params.value + (props.x ? (props.x.measure || '') : '')
                        }
                    },
                    emphasis: {
                        formatter: function (params) {
                            if (params.dataIndex == 0) {
                                return params.name + " : " + params.value + (props.y ? (props.y.measure || '' ) : '')
                            }
                            return params.name + " : " + params.value + (props.x ? (props.x.measure || '') : '')
                        }
                    }
                },
                lineStyle: {
                    normal: {
                        type: "solid",
                        color: '#3FA7DC'
                    },
                    emphasis: {
                        width: 0.5
                    }
                },
                trigger: "axis",
                tooltip: {
                    show: false,
                }
            }
        }
        this.state = {
            option: {
                grid: {
                    left: 50,
                    right: 130,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    formatter: function (params) {
                        return params.seriesName + ' <br/>'
                            + (props.x ? ((props.x.name || "x轴") + '：' + params.data[0] + ( props.x.measure || '') + '<br/>') : '')
                            + (props.y ? ((props.y.name || "y轴") + '：' + params.data[1] + (props.y.measure || '')) : '');
                    }
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            iconStyle: {
                                normal: {
                                    borderColor: "#3FA7DC"
                                }
                            }
                        }
                    },
                    left: props.toolboxPosition && props.toolboxPosition[0] != null ? props.toolboxPosition[0] : "auto",
                    top: props.toolboxPosition && props.toolboxPosition[1] != null ? props.toolboxPosition[1] : "auto",
                    right: props.toolboxPosition && props.toolboxPosition[2] != null ? props.toolboxPosition[2] : "auto",
                    bottom: props.toolboxPosition && props.toolboxPosition[3] != null ? props.toolboxPosition[3] : "auto"
                },
                xAxis: [
                    {
                        show: false
                    }
                ],
                yAxis: [
                    {
                        show: false
                    }
                ],
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#0099ff'
                        },
                        formatter: '{a}',
                        position: 'top'
                    }
                },
                series: _series
            }
        };
    }
    sizeFunction(x, y) {
        var z = Math.sqrt(+y / +x) + 8;
        z = (z > 50) ? 50 : z;
        z = (z < 15) ? 18 : z;
        return z;
    }

    static defaultProps = {
        width: "100%",
        height: "350px"
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
            let _option = this.state.option,
                _series = props.data.data;
            if (_series.length) {
                _series.map((r, i)=> {
                    r.type = "scatter";
                    r.symbolSize = props.changeSize && props.data.click_add ? this.sizeFunction(r.click, props.data.click_add) : 10;
                });
                _series[0].markLine = {
                    show: props.data.avaData,
                    data: props.data.avaData || [],
                    symbolSize: 0,
                    label: {
                        normal: {
                            formatter: function (params) {
                                if (params.dataIndex == 0) {
                                    return params.name + " : " + params.value + (props.y ? (props.y.measure || '' ) : '')
                                }
                                return params.name + " : " + params.value + (props.x ? (props.x.measure || '') : '')
                            }
                        },
                        emphasis: {
                            formatter: function (params) {
                                if (params.dataIndex == 0) {
                                    return params.name + " : " + params.value + (props.y ? (props.y.measure || '' ) : '')
                                }
                                return params.name + " : " + params.value + (props.x ? (props.x.measure || '') : '')
                            }
                        }
                    },
                    lineStyle: {
                        normal: {
                            type: "solid",
                            color: '#3FA7DC'
                        },
                        emphasis: {
                            width: 0.5
                        }
                    },
                    trigger: "axis",
                    tooltip: {
                        show: false,
                    }
                }
            };
            _option.series = _series;
            this.setState({
                option:_option
            },()=>{
                this.chart.setOption(this.state.option);
            });
        }
    }
}