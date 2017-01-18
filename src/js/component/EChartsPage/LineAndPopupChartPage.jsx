import React from 'react';
import Demo from "../Demo.jsx";
import Section from "../Section.jsx"
import LineAndPopupChart from '../../plugin/ECharts/LineAndPopupChart.jsx';

export default class LineAndPopupChartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            num:0,
        }
    }

    formatData(){
        if(this.state.num == 1){
            return <a href="http://baidu.com" target="_blank">百度</a>;
        }else if(this.state.num == 2){
            return <a href="http://www.sina.com.cn/" target="_blank">新浪</a>;
        }else if(this.state.num == 3){
            return <a href="http://www.qq.com/" target="_blank">腾讯</a>;
        }else{
            return <span>空</span>;
        }
    }

    clickCallback(data){
        if(data=='2016.05.26'){
            this.setState({
                num:1
            })
        }else if(data=='2016.06.26') {
            this.setState({
                num: 2
            })
        }else if(data=='2016.07.26'){
            this.setState({
                num:3
            })
        }
    }

    render() {
        let _this = this;
        return(<div className="plugin-page">
            <h1>LineAndPopupChart</h1>
            <p>折线图与弹出框的混合，当点击折线图不同部位时，弹出框显示出相应的内容</p>
            <h2>实例</h2>
            <Demo component={<LineAndPopupChart
                    name="销量"
                    isShowMax = {true}
                    colorIndex={1}
                    data={{
                        timeData:['2016.05.26', '2016.06.26', '2016.07.26'],
                        data:[200, 250, 170]
                    }}
                    clickCallback={this.clickCallback.bind(this)}
                    format={this.formatData.bind(this)}
                />}>
                {`<LineAndPopupChart
    name="销量"
    isShowMax = {true}
    colorIndex={1}
    data={{
        timeData:['2016.05.26', '2016.06.26', '2016.07.26'],
        data:[200, 250, 170]
    }}
    clickCallback={this.clickCallback.bind(this)}
    format={this.formatData.bind(this)}
/>`}</Demo>
            <Section data={[
                    {name: "name", type: "string",  des: "折线图的系列名称"},
                    {name: "colorIndex", type: "number", des: '折线图颜色 0，红色；1，蓝色；2，绿色； 默认0'},
                    {name: "isShowMax", type: "boolean", des: '是否显示最大值，true显示；false不显示；默认false,'},
                    {name: "data", type: "object", required:true, des: '传入数据的格式，如 {timeData:[\'2016.05.26\', \'2016.06.26\', \'2016.07.26\'],data:[200, 250, 170]}'},
                ]}/>
            <Section title="回调方法" method="clickCallback(data)" data={[
                    {name: 'data', type: 'string', des: 'data为折线图点击x轴标签或折点时返回的相应x轴标签的字符串，如\'2016.05.26\',点击不同x轴标签，format方法在弹出框中展示不同的内容'},
                ]}/>
            <Section title="回调方法" method="format()" data={[
                    {name: 'format', type: 'object', des: 'format方法里return出的字符串或dom结构在弹出框中展示'},
                ]}/>
        </div>);
    }
}