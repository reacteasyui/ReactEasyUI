import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx"
import MapChart from '../../plugin/ECharts/MapChart.jsx';

export default class MapChartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }

    render() {
        return (
            <div className="map-chart-page">
                <h1>MapChart</h1>
                <h2>地图实例</h2>
                <Demo component={<MapChart
                    name="汽车销量"
                    data={[
                        {name:'北京', value:900},
                        {name:'天津', value:700},
                        {name:'河北', value:500},
                        {name:'内蒙古', value:200},
                        {name:'上海', value:1800}
                    ]}
                />}>
                    {`<MapChart
    name="汽车销量"
    data={[
        {name:'北京', value:900},
        {name:'天津', value:700},
        {name:'河北', value:500},
        {name:'内蒙古', value:200},
        {name:'上海', value:1800}
    ]}
/>`}
                </Demo>
                <Section data={[
                    {name: "name", type: "string", required: true, des: "地图系列名称,如:'汽车销量'"},
                    {name: "data", type: "array", required: true, des: '要显示各省份数据,如[{name:\'北京\', value: 900},{name:\'天津\', value:700}]'},
                    {name: "max", type: "number", default: '2500', des: '可视范围最大值'},
                ]}/>
            </div>);
    }
}