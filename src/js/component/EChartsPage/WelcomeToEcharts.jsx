import React from 'react';
import {Link} from 'react-router';
import Pie from "../../plugin/ECharts/Pie.jsx";
import PieAndLineChart from "../../plugin/ECharts/PieAndLineChart.jsx";
import PieWithLabel from '../../plugin/ECharts/PieWithLabel.jsx';
import Scatter from "../../plugin/ECharts/Scatter.jsx";
import Line from '../../plugin/ECharts/Line.jsx';
import SimpleBar from '../../plugin/ECharts/SimpleBar.jsx';
import VerticalBar from '../../plugin/ECharts/VerticalBar.jsx';
import HorizontalBar from '../../plugin/ECharts/HorizontalBar.jsx';
import MultipleBar from '../../plugin/ECharts/MultipleBar.jsx';
import LineAndPopupChart from '../../plugin/ECharts/LineAndPopupChart.jsx';
import MapChart from '../../plugin/ECharts/MapChart.jsx';
import DoubleYLineChart from '../../plugin/ECharts/DoubleYLineChart.jsx';

export default class WelcomeToEcharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
        }
    }

    formatData() {
        if (this.state.num == 1) {
            return <a href="http://baidu.com" target="_blank">百度</a>;
        } else if (this.state.num == 2) {
            return <a href="http://www.sina.com.cn/" target="_blank">新浪</a>;
        } else if (this.state.num == 3) {
            return <a href="http://www.qq.com/" target="_blank">腾讯</a>;
        } else {
            return <span>空</span>;
        }
    }

    clickCallback(data) {
        if (data == '2016.05.26') {
            this.setState({
                num: 1
            })
        } else if (data == '2016.06.26') {
            this.setState({
                num: 2
            })
        } else if (data == '2016.07.26') {
            this.setState({
                num: 3
            })
        }
    }

    render() {
        return (
            <div className="echarts-welcome-page">
                <h1>Echarts</h1>
                <p>请注意，ReactEasyUI 的组件依赖于 echarts.js 3.0+，请在 ReactEasyUI 前引入 <a href="http://echarts.baidu.com/" target="_blank">echarts.js</a></p>
                <pre><code className="language-markup">
                    &lt;script href="../js/lib/echarts.js"&gt;&lt;script&gt;
                </code></pre>
                <h2>部分示例</h2>
                <div className="echartsDemo">
                    <div className="chart">
                        <Link className="chart-link" to="/echarts/pie">
                            <h4 className="chart-title">环形占比图</h4>
                            <Pie name="金额（元）"
                                 data={[{value:335, name:'固定位'},{value:310, name:'SEM'},{value:234, name:'RTB'}]}/>
                        </Link>
                    </div>
                    <div className="chart">
                        <Link className="chart-link" to="/echarts/pie-with-label">
                            <h4 className="chart-title">饼图</h4>
                            <PieWithLabel name="金额（元）" height="200"
                                          data={[{"name":"一线城市","id":"1","value":"3967"},{"name":"二线城市","id":"2","value":"12238"}]}/>
                        </Link>
                    </div>
                    <div className="chart">
                        <Link className="chart-link" to="/echarts/line">
                            <h4 className="chart-title">折线图</h4>
                            <Line
                                data={
                                    {
                                        name:['线索数','到店数'],
                                        xData:['01-10','02-10','03-10','04-10'],
                                        yData:[
                                            [10,15,13,20],
                                            [8,13,10,18]
                                        ]
                                    }
                                }
                                isShowMax={true}
                                isSmooth={true}
                                height="200"
                            />
                        </Link>
                    </div>
                    <div className="chart">
                        <Link className="chart-link" to="/echarts/simple-bar">
                            <h4 className="chart-title">柱状图</h4>
                            <SimpleBar
                                data={[{value:335, name:'cx-4'},{value:310, name:'雪弗兰'},{value:234, name:'福特'}]}/>
                        </Link>
                    </div>
                    <div className="chart">
                        <Link className="chart-link" to="/echarts/vertical-bar">
                            <h4 className="chart-title">柱状图</h4>
                            <VerticalBar
                                data={[{name:"一线城市",value:"3967"},{name:"二线城市",value:"12238"},{name:"三线城市",value:8534}]}
                                height="200"/>
                        </Link>
                    </div>
                    <div className="chart">
                        <Link className="chart-link" to="/echarts/horizontal-bar">
                            <h4 className="chart-title">柱状图</h4>
                            <HorizontalBar data={[{value:50, name:'这是一个项目' },{value:100, name:'这是二个项目' }]}
                                           height="200"/>
                        </Link>
                    </div>
                    <div className="chart">
                        <Link className="chart-link" to="/echarts/multiple-bar">
                            <h4 className="chart-title">柱状图</h4>
                            <MultipleBar data={[{value:50, name:'这是一个项目',rate:10 },{value:100, name:'这是二个项目',rate:2 }]}
                                         height="200"/>
                        </Link>
                    </div>
                    <div className="chart">
                        <Link className="chart-link" to="/echarts/line-and-popup-chart">
                            <h4 className="chart-title">拆线与弹出框混合图</h4>
                            <LineAndPopupChart
                                name="销量"
                                isShowMax={true}
                                colorIndex={1}
                                data={
                                    {timeData:['2016.05.26', '2016.06.26', '2016.07.26'],data:[200, 250, 170]}
                                }
                                clickCallback={this.clickCallback.bind(this)}
                                format={this.formatData.bind(this)}
                                height="200"
                            />
                        </Link>
                    </div>

                </div>
                <div className="echartsDemo chartDemoB">
                    <div className="chart">
                        <Link className="chart-link" to="/echarts/pie-and-line-chart">
                            <h4 className="chart-title">饼图与折线图混合</h4>
                            <PieAndLineChart
                                name="金额（元）"
                                isShowMax={true}
                                data={{timeData:['2016.06.01','2016.07.01','2016.08.01'],
                                    data:[{value:35,name:'数据1',lineData:[2,6,2]},
                                        {value:65,name:'数据2',lineData:[12,21,20]},
                                        {value:85,name:'数据3',lineData:[12,26,15]},
                                    ]
                                }}/>
                        </Link>
                    </div>
                    <div className="chart">
                        <Link className="chart-link" to="/echarts/double-y-line-chart">
                            <h4 className="chart-title">双Y轴折线图</h4>
                            <DoubleYLineChart
                                name={['点击量','点击率']}
                                data={
                                    {
                                        timeData: ['腾讯', '百度', '爱奇艺', 'PPTV', '东方卫视'],
                                        leftData: [12000, 23200,17000,25340,14300],
                                        rightData:[7,21,15,18,21]}
                                }
                                isShowArea={1}
                                height="360"
                            />
                        </Link>
                    </div>
                    <div className="chart">
                        <Link className="chart-link" to="/echarts/map-chart">
                            <h4 className="chart-title">地图</h4>
                            <MapChart
                                name="汽车销量"
                                data={
                                    [{name: '北京', value: 900},{name: '天津', value:700},{name: '河北', value:500},{name: '内蒙古', value:200},{name: '上海', value:1800}]
                                }
                                height="360"
                                isHideLabel
                            />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}