/**
 * 休假日历插件
 * @author  Cathy
 * @editor 2017-1-23
 */

define(function (require, exports, module) {
    var defaults = {
        minDate: '1970-01-01',//最小日期
        maxDate: '2100-12-31',//最大日期
        fontFlag: '休',//字符标识
        selectedCount: 0,//每月最多可选择日期个数
        scheduleID: '',//容器ID
        currentDate: $.date(),//当前日期，默认显示当前月
        selectedDates: [],//已选择的日期
        callback: function () {
        },//回调函数
    };

    function ScheduleDate(option) {
        console.log('init');
        this._init(option);
    }

    ScheduleDate.prototype = {
        _init: function (option) {
            this._initSettings(option);
            this._showSchedule();
            this._bindEvent();
        },
        //初始化
        _initSettings: function (option) {
            this.settings = $.extend({}, defaults, option);
        },
        //日历
        _showSchedule: function () {
            var _minDate = $.date($.date(this.settings.minDate).format('yyyy-MM') + '-01');
            var _currentDate = $.date($.date(this.settings.currentDate).format('yyyy-MM') + '-01');
            var _maxDate = $.date($.date(this.settings.maxDate).format('yyyy-MM') + '-01');
            var prevDisabled = _currentDate <= _minDate ? ' disabled' : '';
            var nextDisabled = _currentDate >= _maxDate ? ' disabled' : '';
            var _dateTitle = '<div class="dateTitle"><span class="iconfont icon-point-left prevMonth' + prevDisabled + '"></span><em>' + this.settings.currentDate.format('yyyy年MM月') + '</em><span class="iconfont icon-point-right nextMonth' + nextDisabled + '"></span></div>';
            var _weekStr = '<div class="weekStr"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>';
            var render = '';

            var y = this.settings.currentDate.getFullYear();
            var m = this.settings.currentDate.getMonth() + 1;

            render = this._render(y, m);
            $(this.settings.scheduleID).html(_dateTitle + _weekStr + '<div class="sbody">' + render + '</div>');


        },

        _render: function (y, m) {
            var _days = $.date(y + '-' + m + '-1').daysInMonth();
            var _startWeek = $.date(y + '-' + m + '-1').getDay();
            var _endWeek = 6 - $.date(y + '-' + m + '-' + _days).getDay();
            var _daysHtml = '<ul>';
            //日期首行空白填充
            for (var i = 0; i < _startWeek; i++) {
                _daysHtml += '<li class="empty"></li>';
            }
            for (var x = 1; x <= _days; x++) {
                var dateFlag = y + '-' + (m < 10 ? '0' + m : m) + '-' + (x < 10 ? '0' + x : x);
                var curClass = dateFlag == this.settings.currentDate.format('yyyy-MM-dd') ? ' curClass' : '';
                var passedClass = $.date(dateFlag) < $.date(this.settings.currentDate.format('yyyy-MM-dd')) ? ' disabled' : '';
                var _selectedHtml = this.settings.selectedDates.contains(dateFlag) ? '<em>' + this.settings.fontFlag + '</em>' : '';
                var _selectedClass = this.settings.selectedDates.contains(dateFlag) ? 'selected' : '';
                if ((x + _startWeek ) % 7 == 0) {
                    _daysHtml += '<li class="nobr' + curClass + passedClass + '" rel-data="' + dateFlag + '"><span class="' + _selectedClass + '">' + x + _selectedHtml + '</span></li>'
                } else {
                    _daysHtml += '<li class="' + curClass + passedClass + '"rel-data="' + dateFlag + '"><span class="' + _selectedClass + '">' + x + _selectedHtml + '</span></li>';
                }
            }
            //日期末行空白填充
            for (var j = 0; j < _endWeek; j++) {
                _daysHtml += '<li class="empty"></li>';
            }
            return _daysHtml + '</ul>';
        },
        //事件绑定
        _bindEvent: function () {
            var _this = this,
                container = $(this.settings.scheduleID);
            container.on('click', "li span", function () {
                console.log('ssss');
                if ($(this).parent().attr('class') == ' disabled') {
                    return;
                }
                if ($(this).attr('class') == 'selected') {
                    $(this).removeClass('selected');
                    $(this).find('em').remove();
                    //_this.settings.selectedDates
                    var _index = _this.settings.selectedDates.indexOf($(this).parent().attr('rel-data'));
                    _this.settings.selectedDates.splice(_index, 1);
                } else {
                    if ($('.selected').length == _this.settings.selectedCount && _this.settings.selectedCount) {
                        alert('每月最多只能选择' + _this.settings.selectedCount + '个日期');
                        return;
                    }
                    $(this).addClass('selected');
                    $(this).append('<em>' + _this.settings.fontFlag + '</em>');
                    _this.settings.selectedDates.push($(this).parent().attr('rel-data'));
                }
                var callback = _this.settings.callback;
                callback(_this);
            });
            container.on('click', '.prevMonth', function () {
                if ($(this).attr("class").indexOf('disabled') != -1) {
                    return;
                }
                var _currentDate = $(this).parent().find('em').html().replace(/年|月/g, '-') + '01';
                var _prevDate = $.date(_currentDate).addMonths(-1);
                $(this).parent().find('em').html(_prevDate.format('yyyy年MM月'));
                render = _this._render(_prevDate.getFullYear(), _prevDate.getMonth() + 1);
                container.find('.sbody').html(render);
                _this.changeBtnState(_prevDate);
            });
            container.on('click', '.nextMonth', function () {
                if ($(this).attr("class").indexOf('disabled') != -1) {
                    return;
                }
                var _minDate = $.date($.date(_this.settings.minDate).format('yyyy-MM') + '-01');
                var _maxDate = $.date($.date(_this.settings.maxDate).format('yyyy-MM') + '-01');
                var _currentDate = $(this).parent().find('em').html().replace(/年|月/g, '-') + '01';
                var _nextDate = $.date(_currentDate).addMonths(1);
                $(this).parent().find('em').html(_nextDate.format('yyyy年MM月'));
                render = _this._render(_nextDate.getFullYear(), _nextDate.getMonth() + 1);
                container.find('.sbody').html(render);
                _this.changeBtnState(_nextDate);
            });
        },
        //改变日期切换按钮状态
        changeBtnState: function (_currentDate) {
            var _this = this,
                $prevMonth = $('.prevMonth'),
                $nextMonth = $('.nextMonth'),
                _minDate = $.date($.date(_this.settings.minDate).format('yyyy-MM') + '-01'),
                _maxDate = $.date($.date(_this.settings.maxDate).format('yyyy-MM') + '-01');
            if ($.date(_currentDate) <= _minDate) {
                if ($prevMonth.attr("class").indexOf('disabled') != -1) {
                    return;
                }
                $prevMonth.addClass('disabled');
            } else {
                $prevMonth.removeClass('disabled');
            }
            if ($.date(_currentDate) >= _maxDate) {
                if ($nextMonth.attr("class").indexOf('disabled') != -1) {
                    return;
                }
                $nextMonth.addClass('disabled');
            } else {
                $nextMonth.removeClass('disabled');
            }
        }
    }
    module.exports = ScheduleDate;
});