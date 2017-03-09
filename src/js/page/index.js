import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, hashHistory, Link} from 'react-router';

import Prism from "../lib/prism"; // 代码高亮插件
import Header from "../component/Header";
import Sider from "../component/Sider";
import GettingStarted from "../component/GettingStarted";
import About from "../component/About";

import AutoCompletePage from "../component/BasePage/AutoCompletePage";
import FreeCheckBoxPage from "../component/BasePage/FreeCheckBoxPage"
import TextWithCountPage from "../component/BasePage/TextWithCountPage"
import DelIconInputPage from "../component/BasePage/DelIconInputPage";
import SwitchBtnPage from "../component/BasePage/SwitchBtnPage";

import DateRangePickerPage from "../component/DatePage/DateRangePickerPage";
import DateChooserPage from "../component/DatePage/DateChooserPage";
import CalenderPage from "../component/DatePage/CalendarPage";
import AppCalenderPage from "../component/DatePage/AppCalendarPage";
import SchedulePage from "../component/DatePage/SchedulePage";
import TimerPage from "../component/DatePage/TimerPage";

import TablePage from "../component/ListPage/TablePage";

import WelcomeToEcharts from "../component/EChartsPage/WelcomeToEcharts";
import PiePage from "../component/EChartsPage/PiePage";
import PieAndLineChartPage from "../component/EChartsPage/PieAndLineChartPage";
import PieWithLabelPage from "../component/EChartsPage/PieWithLabelPage";
import ScatterPage from "../component/EChartsPage/ScatterPage";
import LinePage from "../component/EChartsPage/LinePage";
import SimpleBarPage from "../component/EChartsPage/SimpleBarPage";
import VerticalBarPage from "../component/EChartsPage/VerticalBarPage";
import HorizontalBarPage from "../component/EChartsPage/HorizontalBarPage";
import MultipleBarPage from "../component/EChartsPage/MultipleBarPage";
import LineAndPopupChartPage from "../component/EChartsPage/LineAndPopupChartPage";
import MapChartPage from "../component/EChartsPage/MapChartPage";
import DoubleYLineChartPage from "../component/EChartsPage/DoubleYLineChartPage";

import ProgressBarPage from "../component/ProgressPage/ProgressBarPage";
import ComparePage from "../component/ProgressPage/ComparePage";
import RingPage from "../component/ProgressPage/RingPage";
import PieChartPage from "../component/ProgressPage/PieChartPage";
import ProgressChartPage from "../component/ProgressPage/ProgressChartPage";
import LoadingPage from "../component/ProgressPage/LoadingPage";
import ProgressPage from "../component/ProgressPage/ProgressPage";
import VennPage from "../component/ProgressPage/VennPage.jsx";
import OverlapPage from "../component/ProgressPage/OverlapPage.jsx";

import AudioPlayPage from "../component/OthersPage/AudioPlayPage";
import IframeLoadPage from "../component/OthersPage/IframeLoadPage";

class Home extends React.Component {
    componentDidMount() {
        $.handleMenuToggle();
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="main home">
                    <h1 className="home-title">ReactEasyUI</h1>
                    <p className="home-desc">ReactEasyUI 是一个基于 React 的常用组件库，封装了日期、列表、图表等常见使用场景，由<Link to="about">易车前端团队</Link>倾力打造。</p>
                    <div className="home-btns">
                        <Link className="btn btn-start" to="getting-started">快速开始</Link>
                        <a className="btn btn-github" href="https://github.com/reacteasyui/ReactEasyUI" target="_blank">GitHub</a>
                    </div>
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    componentDidMount() {
        $('.sider').scrollbar();
        $.handleMenuToggle();
    }

    componentDidUpdate() {
        let _code = $('[class*="language-"]');
        _code.map((i, item) => Prism.highlightElement(item));
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="main clearfix">
                    <Sider/>
                    <div className="docs">
                        <div className="content">
                            {
                                React.cloneElement(this.props.children, {
                                    key: this.props.location.pathname
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="/" component={App}>
            <Route path="getting-started" component={GettingStarted}/>
            <Route path="about" component={About}/>
            <Route path="base">
                <IndexRedirect to={"auto-complete"}/>
                <Route path="auto-complete" component={AutoCompletePage}/>
                <Route path="free-check-box" component={FreeCheckBoxPage}/>
                <Route path="text-with-count" component={TextWithCountPage}/>
                <Route path="del-icon-input" component={DelIconInputPage}/>
                <Route path="switch-btn" component={SwitchBtnPage}/>
            </Route>
            <Route path="date">
                <IndexRedirect to={"date-range-picker"}/>
                <Route path="date-range-picker" component={DateRangePickerPage}/>
                <Route path="date-chooser" component={DateChooserPage}/>
                <Route path="calender" component={CalenderPage}/>
                <Route path="app-calender" component={AppCalenderPage}/>
                <Route path="schedule" component={SchedulePage}/>
                <Route path="timer" component={TimerPage}/>
            </Route>
            <Route path="list">
                <IndexRedirect to={"table"}/>
                <Route path="table" component={TablePage}/>
            </Route>
            <Route path="echarts">
                <IndexRedirect to={"welcome"}/>
                <Route path="welcome" component={WelcomeToEcharts}/>
                <Route path="pie" component={PiePage}/>
                <Route path="pie-and-line-chart" component={PieAndLineChartPage}/>
                <Route path="pie-with-label" component={PieWithLabelPage}/>
                <Route path="scatter" component={ScatterPage}/>
                <Route path="line" component={LinePage}/>
                <Route path="simple-bar" component={SimpleBarPage}/>
                <Route path="vertical-bar" component={VerticalBarPage}/>
                <Route path="horizontal-bar" component={HorizontalBarPage}/>
                <Route path="multiple-bar" component={MultipleBarPage}/>
                <Route path="line-and-popup-chart" component={LineAndPopupChartPage}/>
                <Route path="map-chart" component={MapChartPage}/>
                <Route path="double-y-line-chart" component={DoubleYLineChartPage}/>
            </Route>
            <Route path="progress">
                <IndexRedirect to={"progress-chart"}/>
                <Route path="progress-chart" component={ProgressChartPage}/>
                <Route path="progress-bar" component={ProgressBarPage}/>
                <Route path="compare" component={ComparePage}/>
                <Route path="ring" component={RingPage}/>
                <Route path="pie-chart" component={PieChartPage}/>
                <Route path="loading" component={LoadingPage}/>
                <Route path="progress" component={ProgressPage}/>
                <Route path="venn" component={VennPage}/>
                <Route path="overlap" component={OverlapPage}/>
            </Route>
            <Route path="others">
                <IndexRedirect to={"audio-play"}/>
                <Route path="audio-play" component={AudioPlayPage}/>
                <Route path="iframe-load" component={IframeLoadPage}/>
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);