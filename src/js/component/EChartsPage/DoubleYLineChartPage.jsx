import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx"
import DoubleYLineChart from '../../plugin/ECharts/DoubleYLineChart.jsx';

export default class DoubleYLineChartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }

    render() {
        let _this = this;
        return(<div className="plugin-page">
            <h1>DoubleYLineChartPage</h1>
            <p>双Y轴的折线图，右侧折线图可选是否显示填充颜色</p>
            <h2>实例</h2>
            <Demo component={<DoubleYLineChart
                name={['点击量','点击率']}
                data={{
                    timeData: ['腾讯', '百度', '爱奇艺', 'PPTV', '东方卫视'],
                    leftData: [12000, 23200,17000,25340,14300],
                    rightData:[7,21,15,18,21]
                }}
                xLabelDirection={1}
                isShowArea={1}
            />}>
                {`<DoubleYLineChart
    name={['点击量','点击率']}
    data={{
        timeData: ['腾讯', '百度', '爱奇艺', 'PPTV', '东方卫视'],
        leftData: [12000, 23200,17000,25340,14300],
        rightData:[7,21,15,18,21]
    }}
/>`}</Demo>
            <Section data={[
                {name: "name", type: "array",required: true, des: "折线图系列名称,如:['点击量','点击率']"},
                {name: "data", type: "object", required: true, des: '要显示数据,如{timeData: [\'2016.06.01\', \'2016.07.01\'],leftData: [12000, 23200],rightData:[7,21]}'},
                {name: "isShowArea", type: "number", default: "0", des: '右侧的折线是否显示填充颜色，0：不填充 1:填充'},
            ]}/>
        </div>);
    }
}