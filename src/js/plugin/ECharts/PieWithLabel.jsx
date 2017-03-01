import React from 'react';
import {COLOR, GRID} from "../../core/echarts";
import Chart from "./Chart.jsx";

/**
 @class PieWithLabel
 @extends React.Component
 @constructor
 @param name {String} 统计纬度
 @param [tooltipShow=true] {bool} 是否显示tooltip，默认显示
 @param [legendShow=true] {bool} 是否显示legend，默认显示
 @param [moreLabel=false] {bool} 是否在内外都显示label,默认只在外层显示
 @param selectedIndex [Number] 默认选中
 @param data {Array} 对应数据值，如：[{"name":"一线城市","id":"1","value":"3967"},{"name":"二线城市","id":"2","value":"12238"}]
 @return PieWithLabel 返回PieWithLabel组件
 */
export default class PieWithLabel extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.chart = null;
        if (!props.data)
            return;
        if(props.selectedIndex || props.selectedIndex == 0){
            props.data[props.selectedIndex].selected = true;
        }
        let _legend = props.data.joinKey("name"),
            serie = {
                type: 'pie',
                radius: '55%',
                selectedMode: (props.selectedIndex || props.selectedIndex == 0) ? 'single':false,
                center: props.legendShow ? ['60%', '50%'] : ['50%', '50%'],
                hoverAnimation: false,
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        formatter: "{d}%",
                        position: "outside"
                    }
                },
                data: props.data
            },
            series = [serie];
        if (props.moreLabel) {
            let newSerie = $.extend(true, {}, serie);
            newSerie.label.normal.formatter = "{b}";
            newSerie.label.normal.position = "inner";
            series.push(newSerie);
        }
        //console.log(series);
        this.state = {
            option: {
                color: COLOR.DEFAULT,
                grid: GRID.PIE,
                tooltip: {
                    show: props.tooltipShow,
                    trigger: 'item',
                    formatter: (p)=> {
                        /*console.log(p);
                        console.log(props.name);*/
                        if(props.name){
                            return p.name + "<br>" + props.name + "：" + (''+p.value).formatNumber() + "<br>百分比：" + p.percent + "%";
                        }else{
                            return p.name+"<br>百分比："+p.percent+"%"
                        }
                    }//
                },
                legend: {
                    show: props.legendShow,
                    left: 20,
                    //top: "top",
                    orient: "vertical",
                    // icon: "circle",
                    selectedMode: false,
                    itemWidth: 10,
                    itemHeight: 10,
                    data: _legend
                },
                series: series
            }
        };
    }

    static defaultProps = {
        width: "100%",
        height: "300px",
        legendShow: true,
        moreLabel: false,
        tooltipShow: true
    }

    getChart(chart) {
        this.chart = chart;
    }

    /**
     * @method clickCallback 点击回调事件 返回当前点击的数据项
     * @return {params} 当前数据对象
     */
    clickCallback(params) {
        if (this.props.clickCallback && params.data)
            this.props.clickCallback(params.data);
    }

    render() {
        let _this = this, {width, height, data}=_this.props;
        return (<div>
            {data ?
                <Chart
                    width={width}
                    height={height}
                    option={_this.state.option}
                    clickCallback={_this.clickCallback.bind(this)}
                    getChart={_this.getChart.bind(this)}
                /> : <div className='re-no-result'>暂无数据</div>
            }
        </div>);
    }

    //再次渲染时候重绘组件
    componentWillReceiveProps(props) {
        if (props && props.data) {
            if(props.selectedIndex || props.selectedIndex == 0){
                props.data.map((r,i)=>{
                    if (i== props.selectedIndex){
                        props.data[props.selectedIndex].selected = true;
                    }else{
                        props.data[i].selected = false;
                    }
                });
            }

            let _option = {
                legend: {data: props.data.joinKey("name")},
                series: [{data: props.data}]
            };
            if (props.moreLabel) {
                _option.series.push({data: props.data});
            }
            this.chart.setOption(_option);
        }
    }
}