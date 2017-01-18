import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx"
import Line from '../../plugin/ECharts/Line.jsx';

export default class LinePage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }


    render() {
        let _this = this;
        return(<div className="plugin-page">
            <h1>Line</h1>
            <p>折线图实例，最多可显示三条折线</p>
            <h2>实例</h2>
            <Demo component={<Line
                    data={
                        {
                            name:['线索数','到店数'],
                            xData:['01-10','02-10','03-10','04-10','05-10','06-10'],
                            yData:[
                                [10,15,12,18,13,20],
                                [8,13,10,16,11,18]
                            ]
                        }
                    }
                    color={['#09f','#FF6633']}
                    isShowMax={true}
                    isSmooth={true}
                    height="250px"
                />}>
            {`<Line
    data={
        {
            name:['线索数','到店数'],
            xData:['01-10','02-10','03-10','04-10','05-10','06-10'],
            yData:[
                [10,15,12,18,13,20],
                [8,13,10,16,11,18]
            ]
        }
    }
    color={['#09f','#FF6633']}
    isShowMax={true}
    isSmooth={true}
    height="250px"
/>`}</Demo>
            <Section data={[
                    {name: "data", type: "object", required:true, des: "需要传入的数据格式(格式需符合实例格式)"},
                    {name: "color", type: "array", default: "['#ff4f4f','#57d480','#0099ff']", des: '自定义折线图的颜色'},
                    {name: "isShowMax", type: "boolean", default: "false", des: '是否显示最大值 true：显示，false：不显示'},
                    {name: "isSmooth", type: "boolean", default: "false", des: '折线是否平滑曲线显示 true：平滑显示，false：直线显示'},
                    {name: "width", type: "string", default: "100%", des: '折线图的占宽'},
                    {name: "height", type: "string", default: "400px", des: '折线图的占高'},
                ]}/>
        </div>);
    }
}