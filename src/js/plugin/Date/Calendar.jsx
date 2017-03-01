import React from 'react'
import moment from './moment';
import {DateChooser, MODE} from './DateChooser.jsx';

/**
 @class Calendar
 @extends React.Component
 @constructor
 @param currDate {Date} 当前日期
 @param selectDay {Date} 当前选择的日期 如20161227
 @param DayArr {Array} 带红点的日期 如["20161227","20161228"]
 @return Calendar 返回Calendar组件
 */
export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start: "",//开始时间
            end: "",//结束时间
            currDate: props.currDate||$.date(), // 当前日期 如 20161227
            selectDay: props.selectDay, // 当前选择的日期 如 20161227
            returnDayArr: props.DayArr || [] // 带红点的日期 如["20161227","20161228"]
        }
    }

    componentDidMount() {
        this.onDateChanged();
    }

    onDateChanged(start, end) {
        let _this = this;
        _this.setState({
            start: start,
            end: end
        });
    }

    onDateCallback(start, end, all) {
        if (this.props.onDateChanged) {
            this.props.onDateChanged(start, end, all);
        }
    }

    onDateClick(date) {
        let _this = this;
        _this.setState({
            currDate: date
        }, ()=> {
            _this.onDateCallback(date, date);
        });
    }

    render() {
        let _this = this, calendarArray = [], sysCurrYMD = moment(),
            daysInMonth = moment(_this.state.start).daysInMonth(), //本月有多少天
            calWeekDay = null;
        if (_this.state.start) { //如果有start，取start月份的星期
            let calCurrWeekDay = +moment(_this.state.start).day();
            calWeekDay = calCurrWeekDay === 0 ? 7 : calCurrWeekDay;
        }
        else { //如果没有start，取系统当前月份的星期
            let sysCurrWeekDay = +moment().startOf("month").day();
            calWeekDay = sysCurrWeekDay === 0 ? 7 : sysCurrWeekDay;
        }
        for (let i = 1; i < calWeekDay; i++) {  //日历之前空着的天数
            calendarArray.add({YMD: null, hasData: false});
        }
        for (let i = 1; i < daysInMonth + 1; i++) { //给数组添加天、是否是有记录的天
            let _date = _this.state.start ? moment(_this.state.start).startOf("month").add(i - 1, 'days') : moment().startOf("month").add(i - 1, 'days');
            calendarArray.add({YMD: _date, hasData: _this.state.returnDayArr.contains(_date.format("YYYYMMDD"))});
        }
        return (
            <div className="re-calendar">
                <div className="re-month-select">
                    <DateChooser
                        todayIsMinDay
                        startTime={this.state.start}
                        mode="month"
                        onDateChanged={this.onDateChanged.bind(this)}
                    />
                </div>
                <div className="re-chinese-week">
                    <ul>
                        <li><span>一</span></li>
                        <li><span>二</span></li>
                        <li><span>三</span></li>
                        <li><span>四</span></li>
                        <li><span>五</span></li>
                        <li><span>六</span></li>
                        <li><span>日</span></li>
                    </ul>
                </div>
                <div className="re-day-list">
                    <ul>
                        {
                            calendarArray.map((r, i) => {
                                let style_day_gray = "", calCurrYMD = r.YMD;
                                if (calCurrYMD && (sysCurrYMD.format("YYYYMMDD") > calCurrYMD.format("YYYYMMDD"))) {
                                    style_day_gray = "re-day-gray";
                                }
                                if (calCurrYMD && (_this.state.selectDay == calCurrYMD.format("YYYYMMDD"))) {
                                    style_day_gray = "re-day-white";
                                }
                                return (
                                    <li key={i}>
                                        <div className="re-day-wrapper">
                                            <a onClick={() => {r.hasData && style_day_gray != "re-day-gray" ? this.onDateClick(calCurrYMD.format('YYYYMMDD')) : $.noop()}}
                                               className={`${r.hasData ? "re-day-red" : ""} ${style_day_gray}`}
                                            >{calCurrYMD && calCurrYMD.format("D")}</a>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }

    componentWillReceiveProps(props){
        this.setState({
            selectDay:props.selectDay
        });
    }
}
