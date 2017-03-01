import React from 'react';
import { COLOR } from "../../core/echarts";
import "../../lib/macarons";
/**
 * 移动端进度饼图
 @class PieChart
 @extends React.Component
 @constructor
 @param num {Number} 百分比 如：56%
 @param [color] {String} 进度条颜色 如：
 @return {Component} PieChart
 */
export default class PieChart extends React.Component {
    constructor(props) {
        super(props);
        //this.colorPalette = ['#019AF7', '#54BAFD','#59D37E', '#FE4D4D', '#FEBD57', '#9A25FF', '#43a647'];
        this.state = {
            num: props.num
        }
        this.option = {
            color: [props.color || COLOR.DEFAULT[props.index], "#EBEEF5"],
            series: [
                {
                    type: 'pie',
                    radius: props.radius,
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    silent:true,
                    data: [{value: props.num}, {value: props.num > 100 ? 0 : 100 - props.num}],
                    itemStyle: {
                        normal : {
                            labelLine : {
                                show : false
                            }
                        }
                    }
                }
            ]
        };
        this.chartID = "chart_" + ~~(Math.random() * 100000);
    }

    static defaultProps = {
        index: 0,
        fontSize: 24,
        radius: '50%'
    }


    render() {
        const divStyle = {
            width: '100%',
            height:'100%'
        };
        return (
            <div className={`${this.props.className}`}>
                <div id={this.chartID} style={divStyle}></div>
            </div>
        );
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