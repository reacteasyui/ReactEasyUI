import React from "react";
import {Link} from "react-router";

export default class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.menu = [
            {
                name: "快速开始",
                class: "btn-hide",
                url: "/welcome"
            },
            {
                name: "基础组件",
                url: "/base",
                son: [
                    {name: "AutoComplete", url: "/auto-complete"},
                    {name: "FreeCheckBox", url: "/free-check-box"},
                    {name: "TextWithCount", url: "/text-with-count"},
                    {name: "DelIconInput", url: "/del-icon-input"},
                    {name: "SwitchBtn", url: "/switch-btn"},
                ]
            },
            {
                name: "日期组件",
                url: "/date",
                son: [
                    {name: "DateRangePicker", url: "/date-range-picker"},
                    {name: "DateChooser", url: "/date-chooser"},
                    {name: "Calender", url: "/calender"},
                    {name: "AppCalender", url: "/app-calender"}
                ]
            },
            {
                name: "列表组件",
                url: "/list",
                son: [
                    {name: "Table", url: "/table"}
                ]
            },
            {
                name: "图表组件",
                url: "/echarts",
                class: "btn-hide",
                son: [
                    {name: "Pie", url: "/pie"},
                    {name: "PieAndLineChart", url: "/pie-and-line-chart"},
                    {name: "PieWithLabel", url: "/pie-with-label"},
                    {name: "Scatter", url: "/scatter"},
                    {name: "Line", url: "/line"},
                    {name: "SimpleBar", url: "/simple-bar"},
                    {name: "VerticalBar", url: "/vertical-bar"},
                    {name: "HorizontalBar", url: "/horizontal-bar"},
                    {name: "MultipleBar", url: "/multiple-bar"},
                    {name: "LineAndPopupChart", url: "/line-and-popup-chart"},
                    {name: "MapChart", url: "/map-chart"},
                    {name: "DoubleYLineChart", url: "/double-y-line-chart"}
                ]
            },
            {
                name: "进度与比例图组件",
                url: "/progress",
                son: [
                    {name: "ProgressChart", url: "/progress-chart"},
                    {name: "ProgressBar", url: "/progress-bar"},
                    {name: "Compare", url: "/compare"},
                    {name: "Ring", url: "/ring"},
                    {name: "PieChart", url: "/pie-chart"},
                    {name: "Loading", url: "/loading"},
                    {name: "Progress", url: "/progress"},
                    //{name: "Venn", url: "/venn"},

                ]
            },
            {
                name: "其它组件",
                url: "/others",
                son: [
                    {name: "AudioPlay", url: "/audio-play"},
                    {name: "IframeLoad", url: "/iframe-load"}
                ]
            },
        ];
    }

    render() {
        return (
            <div className="sider">
                {
                    this.menu.map((item, i) => {
                        return (
                            <div key={i}>
                                <Link to={item.url}
                                      className={`primary ${item.son ? 'btn-toggle' : ''} ${item.class ? item.class : ''}`}
                                      activeClassName="active">{item.name}</Link>
                                <div className={`navlist`}>
                                    {
                                        item.son && item.son.map((r, j)=> {
                                            return (
                                                <Link key={j} to={item.url+r.url}
                                                      activeClassName="active">{r.name}</Link>);
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}