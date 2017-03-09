import React from "react";
import './d3.min.js';
import './venn.js';

/**
 @class Venn
 @extends React.Component
 @constructor
 @param [data] {Array} 数据项，如：[
 {sets:["Information"], size: 12},
 {sets:["Overlap"], size: 12},
 {sets:["Circles"], size: 12},
 {sets: ["Information", "Overlap"], size: 4, label: "Redundancy"},
 {sets: ["Information", "Circles"], size: 4, label: "Pie Charts"},
 {sets: ["Overlap", "Circles"], size: 4, label: "Eclipses"},
 {sets: ["Information", "Overlap", "Circles"], size: 2, label: "Venn Diagrams"}
 {sets: ["Information", "Overlap", "Circles"], size: 2, label: "Venn Diagrams"}
 ]
 @param [width] {Number} 图形宽度
 @param [height] {Number} 图形高度
 @param [color] {String} 字符颜色
 @param [tipsText] {String} 统计纬度
 @param [labelSize] {String} label字符大小，默认16px
 @param [isSubLabelShow] {Boolean} 是否在行内显示具体数据，默认不显示
 @param [hoverTips] {Boolean} 是否显示tooltips,默认不显示
 @param [fillColor] {Array} 填充填色
 @param [fillOpacity] {Number} 透明度,默认0.5
 @return {Component} 返回VennChart组件
 */
export default class VennChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : props.data || null,
            width: props.width || 500,
            height: props.height || 400,
            color: props.color || '#000',
            tipsText: props.tipsText+':' || 'size:',
            labelSize: props.labelSize || '16px',
            isSubLabelShow: props.isSubLabelShow || false,
            hoverTips: props.hoverTips || false,
            fillColor: props.fillColor || [],
            fillOpacity: +props.fillOpacity || .5,
        }
        this.chartID = "chart_" + ~~(Math.random() * 100000);
    }

    render() {
        return (
            <div id={this.chartID}></div>
        );
    }
    componentDidMount(){

        let _this = this,chart;
        if(_this.state.fillColor.length){
            chart = venn.VennDiagram(_this.state.fillColor).wrap(false).fontSize(_this.state.labelSize).width(_this.state.width).height(_this.state.height);
        }else{
            chart = venn.VennDiagram().wrap(false).fontSize(_this.state.labelSize).width(_this.state.width).height(_this.state.height);
        }
        if(_this.state.isSubLabelShow){
            updateVenn(_this.state.data);
        }else if(_this.state.hoverTips){
            let div = d3.select("#"+_this.chartID);
            div.datum(_this.state.data).call(chart);
            div.selectAll("path")
                .style('fill-opacity',_this.state.fillOpacity);
            var tooltip = d3.select("body").append("div")
                .attr("class", "re-venn-tooltip");

            div.selectAll("path")
                .style("stroke-opacity", 0)
                .style("stroke", "#fff")
                .style("stroke-width", 3)
                .style('fill-opacity',+_this.state.fillOpacity)

            div.selectAll("g")
                .on("mouseover", function(d, i) {
                    // sort all the areas relative to the current item
                    venn.sortAreas(div, d);

                    // Display a tooltip with the current size
                    tooltip.transition().duration(400).style("opacity", .9);
                    tooltip.text(_this.state.tipsText + d.size);

                    // highlight the current path
                    var selection = d3.select(this).transition("tooltip").duration(400);
                    selection.select("path")
                        .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
                        .style("stroke-opacity", 1);
                })

                .on("mousemove", function() {
                    tooltip.style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })

                .on("mouseout", function(d, i) {
                    tooltip.transition().duration(400).style("opacity", 0);
                    var selection = d3.select(this).transition("tooltip").duration(400);
                    selection.select("path")
                        .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
                        .style("stroke-opacity", 0);
                });
        }else{
            d3.select("#"+_this.chartID).datum(_this.state.data).call(chart);
            d3.selectAll('.label')
                .style('fill',_this.state.color);
            d3.selectAll('path')
                .style('fill-opacity',_this.state.fillOpacity);
        }
        function updateVenn(sets) {
            var div = d3.select("#"+_this.chartID).datum(sets);
            var layout = chart(div),
                textCentres = layout.textCentres;
            div.selectAll(".label")
                .style("fill", "white");
            console.log(_this.state.fillOpacity);
            div.selectAll(".venn-circle path").style("fill-opacity", _this.state.fillOpacity);

            // add new sublabels (growing from middle)
            layout.enter
                .append("text")
                .attr("class", "sublabel")
                .text(function(d) { return _this.state.tipsText + d.size; })
                .style("fill", "#666")
                .style("font-size", "0px")
                .attr("text-anchor", "middle")
                .attr("dy", "0")
                .attr("x", chart.width() /2)
                .attr("y", chart.height() /2 + 8);

            // move existing
            layout.update
                .selectAll(".sublabel")
                .filter(function (d) { return d.sets in textCentres; })
                .text(function(d) { return _this.state.tipsText + d.size; })
                .style("font-size", "12px")
                .attr("dy", "18")
                .attr("x", function(d) { return Math.floor(textCentres[d.sets].x);})
                .attr("y", function(d) { return Math.floor(textCentres[d.sets].y)+8;});

            // remove old (shrinking to middle)
            layout.exit
                .select(".sublabel")
                .attr("dy", "0")
                .attr("x", chart.width() /2)
                .attr("y", chart.height() /2 + 8)
                .style("font-size", "0px");

            return layout;
        }
    }
    componentWillReceiveProps(props){
        if(props.data){
            this.setState({
                data : props.data || null,
                width: props.width || 500,
                height: props.height || 400,
                color: props.color || '#000',
                tipsText: props.tipsText+':' || 'size:',
                labelSize: props.labelSize || '16px',
                isSubLabelShow: props.isSubLabelShow || false,
                hoverTips: props.hoverTips || false,
                fillColor: props.fillColor || [],
                fillOpacity: props.fillOpacity || .5,
            });
        }
    }
}