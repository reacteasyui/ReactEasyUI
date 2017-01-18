import React from "react";
import Calendar from "./appcalendar.js";

/**
 @class AppCalendar
 @extends React.Component
 @constructor
 @param display {Number} 首次加载月个数
 @param type {String} 日历类型，单日期选择:single,日期范围选择：multiple
 @param currentDate {Date} 当前日期
 @param canBeSelected {String} 日期可使用范围，用~分隔
 @param formate {String} 日期格式
 @param [minDate] {String} 最小日期
 @param [maxDate] {String} 最大日期
 @return {Component} 返回AppCalendar组件
 */

export default class AppCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.calendar = null;
        this.$calendar = null;
        this.containerID = "calendarDiv_" + ~~(Math.random() * 100000);
        this.state = {
            startDate: props.startDate,
            endDate: props.endDate
        };
    }

    static defaultProps = {
        display: 3,//首次加载月个数
        type: 'multiple', // 日历类型multiple | single
        currentDate: new Date(),//当前日期
        canBeSelected: '',//可使用范围，用~分隔
        format: 'yyyy-MM-dd',//日期格式
        startDate: $.date().addDays(-3),
        endDate: $.date(),
        minDate: null,
        maxDate: null,
        el: ''
    };

    // componentWillMount(){
    //     if(this.props.CalendarLoad)
    //         this.props.CalendarLoad();
    // }

    showCalendar() {
        let _this = this;
        if (!_this.calendar) {
            let options = _this.props;
            options = $.extend( {}, options,
                {
                    calendarID: "calendar_" + ~~(Math.random() * 100000),
                    el: this.props.el ? document.getElementById(this.props.el.slice(1)) : document.body,
                    callback: function (_calendar) {
                        let selectDate = _calendar.getSelectedDate(); //获取选中日期
                        //解决日期不选择也执行callback问题
                        let singleCondition = _this.props.type == 'single' && selectDate[0] != _this.state.startDate.format("yyyy-MM-dd");
                        let multipleCondition = _this.props.type == 'multiple' && (selectDate[0] != _this.state.startDate.format("yyyy-MM-dd") || selectDate[1] != _this.state.endDate.format("yyyy-MM-dd"));
                        if(singleCondition || multipleCondition){
                            _this.setState({
                                startDate: $.date(selectDate[0]),
                                endDate: $.date(selectDate[1])
                            }, ()=> {
                                if (_this.props.onSelected)
                                    _this.props.onSelected(_this.state.startDate, _this.state.endDate);
                            });
                        }
                    }
                });
            _this.calendar = new Calendar(options);
            _this.calendar.setSelectedDate(_this.state.startDate.format("yyyy-MM-dd") + "," + _this.state.endDate.format("yyyy-MM-dd"));
            _this.$calendar = $("#" + _this.calendar.settings.calendarID);
        }
        _this.calendar.setSelectedDate(_this.state.startDate.format("yyyy-MM-dd") + "," + _this.state.endDate.format("yyyy-MM-dd"));
        _this.$calendar.fadeIn();
        _this.calendar.settings.isOpen = true;
        //打开前滚轮高度
        _this.calendar.settings.currScrollTop = $(window).scrollTop();
        //定位到开始日期高度
        let _startT = _this.state.startDate.format("yyyy-MM-01"),
            _startDom = _this.$calendar.find('span[data-date="' + _startT + '"]'),
            _startPos = _startDom.offset();
        $(window).scrollTop(_startPos.top - 75);
        if (_this.calendar.settings.type == 'multiple') {
            $(".calendar-depTips").addClass("fade-in");
        }
    }

    render() {
        let {type, format}=this.props;
        let {startDate, endDate}=this.state;
        return (
            <div id={this.containerID}>
                <div className="dateArea" onClick={this.showCalendar.bind(this)}>
                    {this.props.description ? (<em className="pd-r">{this.props.description}</em>) : ''}
                    <span className="startDate" rel={startDate.format("yyyy-MM-dd")}>
                        {startDate.format(format)}
					</span>
                    {
                        type == 'single' ? null : (
                                <span className="endDate" rel={endDate?endDate.format("yyyy-MM-dd"):""}> -
                                    {endDate && endDate.format(format)}
					</span>)
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        console.log("卸载了日历控件");
        //this.calendar.removeDOM();
    }
}