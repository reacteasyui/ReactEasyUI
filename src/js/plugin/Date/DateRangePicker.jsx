import React from 'react';
import moment from './moment.js';
import './daterangepicker.js';

/**
 @class DateRangePicker
 @extends React.Component
 @constructor
 @param [range] {Boolean} 日历用于选择时间段，默认选择某天
 @param [format] {String} 设置日期格式,如'YYYY-MM-DD'
 @param [startTime] {String} 默认起始日期，如 '2016-07-11'
 @param [endTime] {String} 默认截止日期，如 '2016-07-18'
 @param [todayIsMinDay] {Boolean} 今天之前的日期不可选
 @param [todayIsMaxDay] {Boolean} 今天之后的日期不可选
 @param [required] {Boolean} 日期是否为必填项
 @param [maxDate] {String} 最大日期
 @param [minDate] {String} 最小日期
 @param [isButtonHide=false] {Boolean} 是否隐藏右侧按钮
 @return {Component} 返回DateRangePicker组件
 */

export default class DateRangePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: props.startTime,
            endTime: props.endTime,
            isButtonHide: props.isButtonHide || false,
            minDate:props.minDate || null,
            maxDate:props.maxDate || null,
            val: ""
        };
        this.$picker = null;
        this.del = false;
        this.iconStyle = [(<i className={"glyphicon  glyphicon-calendar fa fa-calendar"}></i>),
            (<i className={"iconfont  icon-triangle-down"}></i>)];
        this.pickerID = "datepicker_" + ~~(Math.random() * 100000);
        //console.log(props.startTime)
    }

    static defaultProps = {
        singleDatePicker: true,
        timePicker: false,
        timePicker24Hour: true,
        timePickerIncrement: 15,
        autoApply: true,
        linkedCalendars: true,
        autoUpdateInput: false,
        alwaysShowCalendars: true,
        //opens: "center",
        format: 'YYYY-MM-DD HH:mm',
        icon: true,
        iconStyle: 0
    }

    onChange(e) {
        //console.log("render")
        //console.log(e.keyCode);
    }

    /**
     @method onKeyUp
     @param event {Object} delete键或者backspace键盘事件
     @return
     */
    onKeyUp(e) {
        let _keyCode = e.keyCode;
        if (_keyCode == 8 || _keyCode == 46) {
            //this.del = true;
            this.$picker.data('daterangepicker').setStartDate("");
            this.$picker.data('daterangepicker').setEndDate("");
            this.$picker.data('daterangepicker').hide();
            this.setState({
                //startTime: null,
                //endTime: null,
                val: ""
            });
            if (this.props.onSelected) {
                this.props.onSelected(null, null);
            }
        }
    }

    onSelected() {
        const {
            startTime, endTime
        } = this.state;
        if (this.props.onSelected) {
            this.props.onSelected(startTime, endTime);
        }

    }

    render() {
        const {
            required, placeholder, name, ...props
        } = this.props;
        // let _val = "";
        // if (startTime) {
        //     _val = !range ? startTime.format(format) : startTime.format(format) + "~" + endTime.format(format);
        // }
        return (
            <div className={this.props.className?this.props.className:"daterangepicker_dma"}>
                <input name={this.props.name}
                       id={this.pickerID}
                       className="form-control _text _textFocus"
                       required={required}
                       type="text"
                       value={this.state.val}
                       onChange={this.onChange.bind(this)}
                       onKeyUp={this.onKeyUp.bind(this)}
                       placeholder={placeholder}
                />
                {this.props.icon ? this.iconStyle[this.props.iconStyle] : null}
            </div>);

    }

    componentDidMount() {

        var _this = this, format = this.props.format,
            options = this.props;
        _this.$picker = $("#" + this.pickerID);//$(this.refs.datarangepicker);
        // let val = "";
        // if (this.props.startTime) {
        //     val = !this.props.range ? this.props.startTime.format(this.props.format) : this.props.startTime.format(this.props.format) + "~" + this.props.endTime.format(this.props.format);
        //     options = $.extend({}, options, {startDate: this.props.startTime, endDate: this.props.endTime});
        // }
        if (this.props.range && !this.props.singleDatePicker && !_this.state.isButtonHide) {
            options = $.extend({}, options, {
                ranges: {
                    '今天': [moment(), moment()],
                    //'昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    //'过去7天': [moment().subtract(6, 'days'), moment()],
                    '过去30天': [moment().subtract(29, 'days'), moment()],
                    '本周': [moment().startOf('week'), moment().endOf('week')],
                    '上周': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
                    '下周': [moment().add(1, 'week').startOf('week'), moment().add(1, 'week').endOf('week')],
                    '本月': [moment().startOf('month'), moment().endOf('month')],
                    '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    '下月': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')]
                }
            });
        }

        if (this.props.startTime) {
            options = $.extend({}, options, {startDate: this.props.startTime});
        }
        if (this.props.endTime) {
            options = $.extend({}, options, {endDate: this.props.endTime});
        }
        if (this.props.todayIsMinDay) {
            options = $.extend({}, options, {minDate: moment().startOf('day'), maxDate: moment("2099-12-31")});
        }
        if (this.props.todayIsMaxDay) {
            options = $.extend({}, options, {maxDate: moment().endOf('day'), minDate: moment("1970-01-01")});
        }
        if (this.props.maxDate) {
            options = $.extend({}, options, {maxDate: this.props.maxDate});
        }
        if (this.props.minDate) {
            options = $.extend({}, options, {minDate: this.props.minDate});
        }

        setTimeout(function () {
            _this.$picker.daterangepicker(options, function (start, end, label) {
                console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
                if (start.format("YYYY") < 2000 && end.format("YYYY") < 2000)
                    return;
                let _start = start.format(format), _end = end.format(format),
                    _val = !_this.props.range ? _start : _start + "~" + _end;
                _this.setState({
                    startTime: start,
                    endTime: end,
                    val: _val
                }, ()=> {
                    _this.onSelected();
                    $('input[name="' + _this.props.name + '"]').blur();
                });
            });
        }, 1);
    }

    componentWillUnmount() {
        this.$picker.data('daterangepicker').remove();
    }

    componentWillReceiveProps(props) {
        let _this = this, val = "";
        if (props.startTime) {
            val = !props.range ? props.startTime.format(props.format) : props.startTime.format(props.format) + "~" + props.endTime.format(props.format);
            let _datepicker = _this.$picker.data('daterangepicker');
            if (_datepicker) {
                let _start = moment(props.startTime.format("YYYY-MM-DD")),
                    _end = props.endTime ? moment(props.endTime.format("YYYY-MM-DD")) : _start;
                _datepicker.setStartDate(_start);
                _datepicker.setEndDate(_end);
            }
            // console.log(props.startTime);
            // console.log(props.endTime);
        }
        _this.setState({
            startTime: props.startTime,
            endTime: props.endTime,
            maxDate: props.maxDate || null,
            minDate:props.minDate || null,
            isButtonHide:props.isButtonHide || false,
            val: val
        }, ()=> {
            let _datepicker = _this.$picker.data('daterangepicker');
            if ( _datepicker && props.maxDate) {
                _datepicker.maxDate = props.maxDate;
            }
            if (_datepicker && props.minDate) {
                _datepicker.minDate = props.minDate;
            }
        });
    }

    // componentDidUpdate() {
    //
    // }
}