import React from 'react';
import { COLOR } from "../../core/echarts";
import "../../lib/macarons";
/**
 * pc端进度饼图
 @class ProgressChart
 @extends React.Component
 @constructor
 @param num {Number} 百分比 如：56%
 @param [color] {String} 进度条颜色 如：
 @return {Component} ProgressChart
 */
export default class ProgressChart extends React.Component {
    constructor(props) {
        super(props);
        //this.colorPalette = ['#54BAFD', '#59D37E', '#FE4D4D', '#FEBD57', '#9A25FF', '#43a647'];
        this.state = {
            num: props.num
        }
        this.option = {
            // title:{
            //     text:props.title||"",
            //     x:'center',
            //     y:'bottom',
            //     textStyle:{
            //         fontSize:14,
            //         fontWeight:'normal'
            //     }
            // },
            color: [props.color || COLOR.DEFAULT[props.index], "#F1F4F9"],
            series: [
                {
                    //name: '访问来源',
                    type: 'pie',
                    radius: props.radius,
                    // radius: ['55%', '60%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: props.fontSize,
                                fontWeight: 'bold',
                                color: "#000000"
                            },
                            formatter: function (params) {
                                if (params.dataIndex == 0) {
                                    //console.log(params);
                                    return params.value + "%";
                                } else {
                                    return "";
                                }
                            }
                        }
                    },
                    data: [{value: props.num}, {value: props.num > 100 ? 0 : 100 - props.num}]
                }
            ]
        };
        this.chartID = "chart_" + ~~(Math.random() * 100000);
    }

    static defaultProps = {
        index: 0,
        fontSize: 24,
        radius: ['90%', '100%']
    }


    render() {
        const divStyle = {
            width: this.props.width,
            height: this.props.height
        };
        return (<div className={`${this.props.className} pr`}>
            <div id={this.chartID} style={divStyle}></div>
            {this.props.children}
            <div className="progressgChartModel"></div>
        </div>);
    }

    componentDidMount() {
        var _this = this;
        // 基于准备好的dom，初始化echarts实例
        _this.myChart = echarts.init(document.getElementById(this.chartID));
        _this.myChart.setOption(this.option);
    }

    componentWillReceiveProps(props) {
        let _this = this;
        if (props.num != _this.state.num) {
            _this.setState({
                num: props.num
            });
            _this.myChart.setOption({series: [{data: [{value: props.num},  {value: props.num > 100 ? 0 : 100 - props.num}]}]});
        }
    }
}