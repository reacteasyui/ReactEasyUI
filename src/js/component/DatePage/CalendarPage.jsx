import React from "react";
import Demo from "../Demo.jsx";
import Section from "../Section.jsx";
import Calendar from "../../plugin/Date/Calendar.jsx";

export default class CalendarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectDay: $.date().format("yyyyMMdd")
        }
    }

    onDateChanged(start, end) {
        this.setState({
            selectDay: start
        });
    }

    render() {
        return (
            <div className="calendar-page">
                <h1>Calendar</h1>
                <p>日历组件</p>
                <Demo title="实例" component={<Calendar
                    selectDay={this.state.selectDay}
                    DayArr={[$.date().format("yyyyMMdd"), $.date().addDays(2).format("yyyyMMdd")]}
                    onDateChanged={this.onDateChanged.bind(this)}
                />}>
                    {`<Calendar
    selectDay={this.state.selectDay}
    DayArr={[$.date().format("yyyyMMdd"), $.date().addDays(2).format("yyyyMMdd")]}
    onDateChanged={this.onDateChanged.bind(this)}
/>

// 初始化
this.state={
    selectDay: $.date().format("yyyyMMdd")
}

// 回调方法
onDateChanged(start, end) {
    this.setState({
        selectDay: start
    });
}`}
                </Demo>
                <Section title="参数" data={[
                    {name: 'currentDate', type: 'date', des: '当前日期'},
                    {name: 'selectDay', type: 'date', des: '当前选择的日期 如 20161227'},
                    {name: 'DayArr', type: 'array', des: '带红点的日期 如 ["20161227","20161228"]'},
                ]}/>
            </div>
        );
    }
}