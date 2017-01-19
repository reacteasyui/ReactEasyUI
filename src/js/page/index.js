import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';

import Prism from "../lib/prism"; // 代码高亮插件
import Header from "../component/Header";
import Sider from "../component/Sider";
import Welcome from "../component/Welcome";
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

import AudioPlayPage from "../component/OthersPage/AudioPlayPage";
import IframeLoadPage from "../component/OthersPage/IframeLoadPage";

class App extends React.Component {

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
        <Route path="/" component={App}>
            <IndexRedirect to={"welcome"}/>
            <Route path="welcome" component={Welcome}/>
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