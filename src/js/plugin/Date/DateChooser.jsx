import React from 'react';
import moment from './moment.js';
import DateRangePicker from './DateRangePicker.jsx';

/**
 @class DateChooser
 @extends React.Component
 @constructor
 @param [mode] {String} 可选"day", "week", "month", "range"，默认'day'
 @param [startTime] {String} 默认起始日期，如 '2016-07-11'
 @param [endTime] {String} 默认截止日期，如 '2016-07-18'
 @param [empty] {Boolean}  输入框有无日期
 @param [onDateChanged] {Function} 日期改变时触发的事件
 @param [maxDate] {String} 最大日期
 @param [minDate] {String} 最小日期
 @param [isButtonHide] {Boolean} 是否隐藏右侧按钮
 @return {Component} 返回DateChooser组件
 */

export const MODE = ["day", "week", "month", "range", "year"];

export class DateChooser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: !props.empty ? (props.startTime ? moment(props.startTime) : moment()) : null,
            endDate: !props.empty ? (props.endTime ? moment(props.endTime) : moment()) : null,
            minDate: props.minDate ? moment(props.minDate) : null,
            maxDate: props.maxDate ? moment(props.maxDate) : null,
            isButtonHide: props.isButtonHide || false,
        }
        this.getMaxMinDay(props);
        this.text = null;
    }

    /**
     * @property defaultProps
     * 默认值
     */
    static defaultProps = {
        mode: MODE[0],
        todayIsMaxDay: false,
        todayIsMinDay: false,
        format: "MM月DD日"
    }

    /**
     @method onDateChanged
     @param start {String} 起始日期，如 '2016-07-11'
     @param end {String} 截止日期，如 '2016-07-18'
     @return
     */
    onDateChanged(start, end) {
        let _this = this, mode = _this.props.mode,
            _start, _end;
        if (!start && !end) {
            if (_this.props.onDateChanged) {
                _this.props.onDateChanged(null, null);
            }
            return;
        }
        //天
        if (mode == MODE[0]) {
            _start = start;
            _end = null;
            //this.maxDay = _start;
        }
        //周||月
        else if (mode == MODE[1] || mode == MODE[2]) {
            _start = start.startOf(mode).clone();
            _end = start.endOf(mode).clone();
        }
        //范围
        else if (mode == MODE[3]) {
            _start = moment(start);
            _end = moment(end);
        }
        //年
        else if (mode == MODE[4]) {
            _start = moment(start);
            _end = moment(end);
        }
        console.log("datechooser-onDateChanged");
        console.log(_start);
        console.log(_end);
        //状态变更
        _this.setState({
            date: _start,
            endDate: _end
        });
        // console.log(_start);
        // console.log(_end);
        if (_this.props.onDateChanged) {
            _this.props.onDateChanged(_start, _end);
        }
    }

    getMaxMinDay(props) {
        if (props.mode == MODE[0] || props.mode == MODE[3]) {
            this.maxDay = moment().subtract(1, MODE[0]);
            this.minDay = moment().add(1, MODE[0]).startOf(MODE[0]).clone();
        } else {
            this.maxDay = moment().subtract(1, props.mode);
            this.minDay = moment().add(1, props.mode).startOf(props.mode).clone();
        }
    }

    onAdd() {
        let _this = this,
            mode = _this.props.mode,
            _date = _this.state.date;
        if (_this.props.todayIsMaxDay && _date > _this.maxDay) return false;
        _date = _date.add(1, mode);
        _this.onDateChanged(_date, _date);
    }

    onSubtract() {
        let _this = this,
            mode = _this.props.mode,
            _date = _this.state.date;
        if (_this.props.todayIsMinDay && _date < _this.minDay) return false;
        _date = _date.subtract(1, mode);
        _this.onDateChanged(_date, _date);
    }

    render() {
        // console.log(this.props);
        // console.log(this.state);
        const {mode, todayIsMaxDay, todayIsMinDay, datelimit, opens, format}=this.props;
        const {date, endDate}=this.state;
        const now = moment();
        let dateBtnL = (<a className={`dateBtn ${todayIsMinDay&&date<this.minDay?"disabled":""}`}
                           onClick={this.onSubtract.bind(this)}>
                <i className="iconfont icon-xiangzuo"></i></a>),
            dateBtnR = (<a className={`dateBtn ${todayIsMaxDay&&date>this.maxDay?"disabled":""}`}
                           onClick={this.onAdd.bind(this)}>
                <i className="iconfont icon-xiangyou"></i></a>);
        if (mode == "day") {
            this.text = (
                <div className="dateChooser">
                    {dateBtnL}
                    <DateRangePicker icon={false}
                                     todayIsMaxDay={todayIsMaxDay}
                                     todayIsMinDay={todayIsMinDay}
                        // format={"YYYY年MM月DD日"}
                                     format={format}
                                     startTime={date}
                                     opens={opens}
                                     onSelected={this.onDateChanged.bind(this)}
                    />
                    {dateBtnR}
                </div>);
        } else if (mode == "week") {
            if (this.props.dateLimit) {//时间限制
                let nowWeek = now.format("d");
                if (date.format() == now.startOf("week").format() && nowWeek < 4 && nowWeek > 0) {//周三之前显示上周
                    //date.add(-1, "week");
                }
            }
            let _date = $.date(date.format("YYYY-MM-DD")).currentWeek();
            this.text = (
                <div className="dateChooser">
                    {dateBtnL}
                    <div
                        className="dateShow">{_date[0].format("MM月dd日")}-{_date[6].format("MM月dd日")}</div>
                    {dateBtnR}
                </div>);
        } else if (mode == "month") {
            if (this.props.dateLimit) {
                let nowMonth = now.format("DD");
                if (date.format() == now.startOf("month").format() && nowMonth < 8) {
                    // date.add(-1, "month")
                }
            }
            this.text = (
                <div className="dateChooser">
                    {dateBtnL}
                    <div className="dateShow">{date.format("YYYY年MM月")}</div>
                    {dateBtnR}
                </div>);
        } else if (mode == "range") {
            this.text = (
                <div className="dateChooser">
                    {
                        this.props.minDate && this.props.maxDate ? (
                            <DateRangePicker icon={false}
                            singleDatePicker={false}
                            todayIsMaxDay={todayIsMaxDay}
                            todayIsMinDay={todayIsMinDay}
                            range
                            format={format}
                            startTime={date}
                            endTime={endDate}
                             minDate={this.state.minDate}
                             maxDate={this.state.maxDate}
                            isButtonHide ={this.state.isButtonHide}
                            opens={opens}
                            onSelected={this.onDateChanged.bind(this)}
                            />
                        ):(
                            <DateRangePicker icon={false}
                            singleDatePicker={false}
                            todayIsMaxDay={todayIsMaxDay}
                            todayIsMinDay={todayIsMinDay}
                            range
                            format={format}
                            startTime={date}
                            endTime={endDate}
                            isButtonHide ={this.state.isButtonHide}
                            opens={opens}
                            onSelected={this.onDateChanged.bind(this)}
                            />
                        )
                    }
                </div>);
        } else if (mode == "year") {
            if (this.props.dateLimit) {
                let nowYear = now.format("YYYY");
                // if (date.format() == now.startOf("year").format() && nowYear < 8) {
                //     // date.add(-1, "month")
                // }
            }
            this.text = (
                <div className="dateChooser">
                    {dateBtnL}
                    <div className="dateShow">{date.format("YYYY年")}</div>
                    {dateBtnR}
                </div>);
        }
        //console.log(moment().format());

        return (
            <div className="dateChooserWrap">
                {this.text}
            </div>
        );
    }

    componentWillReceiveProps(props) {
        this.setState({
            date: !props.empty ? (props.startTime ? moment(props.startTime) : moment()) : null,
            endDate: !props.empty ? (props.endTime ? moment(props.endTime) : moment()) : null,
            minDate: props.minDate ? moment(props.minDate) : null,
            maxDate: props.maxDate ? moment(props.maxDate) : null,
            isButtonHide: props.isButtonHide || false,
        });
        this.getMaxMinDay(props);
    }
}