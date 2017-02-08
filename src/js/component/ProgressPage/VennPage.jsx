import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import VennChart from "../../plugin/Venn/VennChart.jsx"

export default class VennPage extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let _this = this;
        return (<div className="plugin-page">
            <h1>Venn</h1>
            <p>韦恩图</p>
            <h2>实例</h2>
            <VennChart data={[
            {sets:["Information"], size: 12},
            {sets:["Overlap"], size: 12},
            {sets:["Circles"], size: 12},
            {sets: ["Information", "Overlap"], size: 4, label: "Redundancy"},
            {sets: ["Information", "Circles"], size: 4, label: "Pie Charts"},
            {sets: ["Overlap", "Circles"], size: 4, label: "Eclipses"},
            {sets: ["Information", "Overlap", "Circles"], size: 2, label: "Venn Diagrams"}
    ]} tipsText="线索" isSubLabelShow/>
        </div>);
    }
}