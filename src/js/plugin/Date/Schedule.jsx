import React from 'react';

/**
 @class Schedule
 @extends React.Component
 @constructor
 @param [minDate] {date} 显示的最小日期
 @param [maxDate] {date} 可显示的最大日期
 @param [currentDate] {date} 当前日期
 @param [fontFlag] {string}  选中状态可显示字符标识
 @param [selectedCount] {string | number} 每月最多可选择的日期数，默认无限制
 @param [selectedDates] {array} 默认选中的日期
 @param [callback] {function} 选中事件后回调函数
 @param [tipsMsg] {function} 选择日期限制提示回调函数
 @return {Component} 返回Schedule组件
 */

export default class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minDate: props.minDate || '1970-01-01',
            currentDate: props.currentDate || $.date(),
            maxDate: props.maxDate || '2100-12-31',
            fontFlag: props.fontFlag || '',
            selectedCount: props.selectedCount || 0,
            selectedDates: props.selectedDates || [],
            scheduleData: [],
            selectedValue: '',
            isClickPrev: true,
            isClickNext: true,
        };
        this.ScheduleID = "scheduleDateDiv_" + ~~(Math.random() * 100000);
        this.scheduleDate = null;
    }

    componentWillMount() {
        let _this = this;
        _this.showSchedule();
    }

    showSchedule() {
        let _minDate = $.date($.date(this.state.minDate).format('yyyy-MM') + '-01'),
            _currentDate = $.date($.date(this.state.currentDate).format('yyyy-MM') + '-01'),
            _maxDate = $.date($.date(this.state.maxDate).format('yyyy-MM') + '-01'),
            y = _currentDate.getFullYear(),
            m = _currentDate.getMonth() + 1;
        this.setState({
            minDate: _minDate,
            currentDate: _currentDate,
            maxDate: _maxDate,
            isClickPrev: $.date(_currentDate) <= $.date($.date(this.state.minDate).format('yyyy-MM') + '-01') ? false : true,
            isClickNext: $.date(_currentDate) >= $.date($.date(this.state.maxDate).format('yyyy-MM') + '-01') ? false : true,
        }, ()=> {
            this.renderSchedule(y, m);
        });
    }

    renderSchedule(y, m) {
        let _days = $.date(y + '-' + m + '-1').daysInMonth(),
            _startWeek = $.date(y + '-' + m + '-1').getDay(),
            _endWeek = 6 - $.date(y + '-' + m + '-' + _days).getDay(),
            _data = [];
        for (let i = 0; i < _startWeek; i++) {
            _data.push({value: 0, rel: ''});
        }
        for (let i = 1; i <= _days; i++) {

            _data.push({value: i, rel: y + '-' + (m < 10 ? '0' + m : m) + '-' + (i < 10 ? '0' + i : i)});
        }
        for (let i = 0; i < _endWeek; i++) {
            _data.push({value: 0, rel: ''});
        }
        this.setState({
            scheduleData: _data,
        });
    }

    bindEvent(item) {
        if (item.rel < $.date().format('yyyy-MM-dd')) {
            return;
        }
        let _selectedDates = this.state.selectedDates;
        //console.log(_selectedDates.contains(item.rel));
        console.log(item.rel);
        if (_selectedDates.contains(item.rel)) {
            let _index = _selectedDates.indexOf(item.rel);
            _selectedDates.splice(_index, 1);
            this.setState({
                selectedDates: _selectedDates,
                selectedValue: item.rel
            }, ()=> {
                this.callback();
            });

        } else {
            if ($(".selected").length == this.state.selectedCount && this.state.selectedCount) {
                this.tipsMsg();
                return;
            }
            _selectedDates.push(item.rel);
            this.setState({
                selectedDates: _selectedDates,
                selectedValue: item.rel
            }, ()=> {
                this.callback();
            });
        }
    }

    callback() {
        if (this.props.callback) {
            console.log(this.state.selectedValue);
            return this.props.callback(this.state.selectedDates, this.state.selectedValue, this.state.currentDate);
        }
    }

    tipsMsg() {
        if (this.props.tipsMsg) {
            return this.props.tipsMsg();
        }
    }

    toPrev() {
        if (!this.state.isClickPrev) {
            return;
        }
        let _date = this.state.currentDate,
            _currentDate = _date.format('yyyy-MM') + '-01',
            _prevDate = $.date(_currentDate).addMonths(-1);
        this.setState({
            currentDate: _prevDate,
            isClickPrev: $.date(_prevDate) <= $.date($.date(this.state.minDate).format('yyyy-MM') + '-01') ? false : true,
            isClickNext: $.date(_prevDate) >= $.date($.date(this.state.maxDate).format('yyyy-MM') + '-01') ? false : true,
        }, ()=> {
            this.renderSchedule(_prevDate.getFullYear(), _prevDate.getMonth() + 1);
        });
    }

    toNext() {
        if (!this.state.isClickNext) {
            return;
        }
        let _date = this.state.currentDate,
            _currentDate = _date.format('yyyy-MM') + '-01',
            _nextDate = $.date(_currentDate).addMonths(1);
        this.setState({
            currentDate: _nextDate,
            isClickPrev: $.date(_nextDate) <= $.date($.date(this.state.minDate).format('yyyy-MM') + '-01') ? false : true,
            isClickNext: $.date(_nextDate) >= $.date($.date(this.state.maxDate).format('yyyy-MM') + '-01') ? false : true,
        }, ()=> {
            this.renderSchedule(_nextDate.getFullYear(), _nextDate.getMonth() + 1);
        });
    }

    render() {
        //console.log(this.state.currentDate);
        return (
            <div id={this.ScheduleID} className="re-scedule-date">
                <div className="re-date-title"><span
                    className={`re-icon re-icon-point-left prevMonth ${this.state.isClickPrev ? '':'disabled'}`}
                    onClick={this.toPrev.bind(this)}></span><em>{this.state.currentDate.format('yyyy年MM月')}</em><span
                    className={`re-icon re-icon-point-right nextMonth ${this.state.isClickNext ? '':'disabled'}`}
                    onClick={this.toNext.bind(this)}></span></div>
                <div className="re-week-str">
                    <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                </div>
                <div className="re-sbody">
                    <ul>
                        {
                            this.state.scheduleData && this.state.scheduleData.map((item, index)=> {
                                // console.log($.date(item.rel));
                                let className = `${(index + 1) % 7 == 0 ? 'nobr' : ''}${item.value == 0 ? 'empty' : ''}${item.rel == $.date().format('yyyy-MM-dd') ? ' curClass' : ''}${$.date(item.rel) < $.date($.date().format('yyyy-MM-dd')) ? ' disabled' : ''}`,
                                    isSelected = this.state.selectedDates.contains(item.rel);
                                return (<li className={className} key={index}>
                                    {item.value ?
                                        <span onClick={()=>{this.bindEvent(item)}}
                                              className={isSelected ? 'selected' : ''}>
                                            <span className={isSelected?"anim anim-zoomOut":"anim"}></span>
                                            <font>{item.value}</font>{isSelected ?
                                            <em>{this.state.fontFlag}</em> : <s></s>}</span> : <s></s>}</li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let _this = this;
    }

    componentWillReceiveProps(props) {
        this.setState({
            minDate: props.minDate || '1970-01-01',
            currentDate: props.currentDate || $.date(),
            maxDate: props.maxDate || '2100-12-31',
            fontFlag: props.fontFlag || '',
            selectedCount: props.selectedCount || 0,
            selectedDates: props.selectedDates || [],
        }, ()=> {
            this.showSchedule();
        });
    }
}