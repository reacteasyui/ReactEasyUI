import React from 'react';
import {COLOR} from "../../core/echarts";
import "./china";


/**
 @class MapChart
 @extends React.Component
 @constructor
 @param name {String} 统计纬度
 @param [max=2500] {Number} 可视范围最大值
 @param data {Array} 对应数据值，如：[[{name: '北京', value: 900},{name: '天津', value:200}]
 @param isHideLabel {Boolean} 是否显示label，默认显示
 @return MapChart 返回MapChart组件
 */
export default class MapChart extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.chart = null;
        this.chartID = "chart_" + ~~(Math.random() * 100000);
        if (!props.data)
            return;
        this.state = {
            option: {
                //grid: GRID.BAR,
                tooltip: {
                    trigger: 'item'
                },
                legend: {},
                visualMap: {
                    min: 0,
                    max: props.max,
                    left: 40,
                    bottom: 50,
                    text: ['高', '低'],           // 文本，默认为数值文本
                    calculable: true,
                    inRange: {
                        color: COLOR.VISUAL_MAP
                    }
                },
                series: [
                    {
                        name: props.name,
                        type: 'map',
                        mapType: 'china',
                        label: {
                            normal: {
                                textStyle: {
                                    color: COLOR.MAP_LABEL,
                                },
                                show: props.isHideLabel ? false : true,
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                areaColor: COLOR.FRIST
                            }
                        },
                        data: props.data
                    }
                ]
            }
        };
    }

    static defaultProps = {
        width: "100%",
        height: "645px",
        max: 2500,
        name: "点击人群"
    }

    render() {
        let _this = this, {width, height, data}=_this.props;
        const divStyle = {width: width, height: height};
        return (<div>
            {data ? <div id={this.chartID} style={divStyle}></div> : <div className='noResult'>暂无数据</div>}
        </div>);
    }

    componentDidMount() {
        let _this = this;
        _this.chart = echarts.init(document.getElementById(_this.chartID), "macarons");
        _this.chart.setOption(_this.state.option);
    }

    //再次渲染时候重绘组件
    componentWillReceiveProps(props) {
        if (props && props.data) {
            this.chart.setOption({
                visualMap: {max: props.max},
                series: [{data: props.data, label: {normal: {show: props.isHideLabel ? false : true}}}],
            });
        }
    }
}