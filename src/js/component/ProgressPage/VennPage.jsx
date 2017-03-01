import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import VennChart from "../../plugin/Progress/Venn/VennChart.jsx"

export default class VennPage extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="venn-page">
                <h1>Venn</h1>
                <p>韦恩图</p>
                <Demo title="实例" component={<VennChart data={[
                    {sets:["Information"], size: 12},
                    {sets:["Overlap"], size: 12},
                    {sets:["Circles"], size: 12},
                    {sets: ["Information", "Overlap"], size: 4, label: "Redundancy"},
                    {sets: ["Information", "Circles"], size: 4, label: "Pie Charts"},
                    {sets: ["Overlap", "Circles"], size: 4, label: "Eclipses"},
                    {sets: ["Information", "Overlap", "Circles"], size: 2, label: "Venn Diagrams"}
                ]} tipsText="线索" fillColor={['red','blue','green']} fillOpacity={.25} hoverTips/>}>
                    {`<VennChart
    data={[
        {sets:["Information"], size: 12},
        {sets:["Overlap"], size: 12},
        {sets:["Circles"], size: 12},
        {sets: ["Information", "Overlap"], size: 4, label: "Redundancy"},
        {sets: ["Information", "Circles"], size: 4, label: "Pie Charts"},
        {sets: ["Overlap", "Circles"], size: 4, label: "Eclipses"},
        {sets: ["Information", "Overlap", "Circles"], size: 2, label: "Venn Diagrams"}
    ]}
    tipsText="线索"
    hoverTips
    fillColor={['red','blue','green']}
    fillOpacity={.25}
/>`}
                </Demo>
                <Demo component={<VennChart data={[
                    {"sets": ["其他"], "size": "89828"},
                    {"sets": ["车商汇"], "size": "194847"},
                    {"sets": ["车易通"], "size": "114104"},
                    {"sets": ["车商汇", "车易通"], "size": "4990"},
                    {"sets": ["车商汇", "其他"], "size": "1631"},
                    {"sets": ["车易通", "其他"], "size": "902"},
                    {"sets": ["车商汇", "车易通", "其他"], "size": "223"}
                ]} tipsText="线索" isSubLabelShow/>}>
                    {`<VennChart
    data={[
        {"sets": ["其他"], "size": "89828"},
        {"sets": ["车商汇"], "size": "194847"},
        {"sets": ["车易通"], "size": "114104"},
        {"sets": ["车商汇", "车易通"], "size": "4990"},
        {"sets": ["车商汇", "其他"], "size": "1631"},
        {"sets": ["车易通", "其他"], "size": "902"},
        {"sets": ["车商汇", "车易通", "其他"], "size": "223"}
    ]}
    tipsText="线索"
    isSubLabelShow
/>`}
                </Demo>
                <Section title="参数" data={[
                    {name: 'data', type: 'array', des: '数据项，如：[ {sets:["Information"], size: 12}, {sets:["Overlap"], size: 12}, {sets:["Circles"], size: 12}, {sets: ["Information", "Overlap"], size: 4, label: "Redundancy"}, {sets: ["Information", "Circles"], size: 4, label: "Pie Charts"}, {sets: ["Overlap", "Circles"], size: 4, label: "Eclipses"}, {sets: ["Information", "Overlap", "Circles"], size: 2, label: "Venn Diagrams"} ]'},
                    {name: 'width', type: 'number', des: '图形宽度'},
                    {name: 'height', type: 'number', des: '图形高度'},
                    {name: 'color', type: 'string', des: '字符颜色'},
                    {name: 'tipsText', type: 'string', des: '统计纬度'},
                    {name: 'fillColor', type: 'array', des: '填充颜色'},
                    {name: 'fillOpacity', type: 'number', des: '填充颜色透明度,默认0.5'},
                    {name: 'labelSize', type: 'string', des: 'label 字符大小，默认 16px'},
                    {name: 'isSubLabelShow', type: 'boolean',  default: 'false', des: '是否在行内显示具体数据，默认不显示'},
                    {name: 'hoverTips', type: 'boolean',  default: 'false', des: '是否显示 tooltips，默认不显示'},
                ]}/>
            </div>
        );
    }
}