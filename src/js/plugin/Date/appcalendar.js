/**
 * 日历插件，可正常按月显示日历，可设置可选择日期范围，特殊处理单选和出发、到达日期
 * @author cwj & North & Cathy
 * @editor 2016-10-22
 */
define(function (require, exports, module) {
    /**
     * 默认配置
     * @type {Object}
     */
    var config = {
        calendarID: "calendar_" + ~~(Math.random() * 100000),
        //display: 3, // 展示多少个月的日历
        minDate: null,
        maxDate: null,
        type: 'multiple', // 日历类型single/multiple
        callback: function () {
        }, // 选择日期后的回调函数
        el: document.body, // 渲染节点
        splitStr: '~', // 日历分割符
        bottom_center: function () {
            if (this.settings.type == 'multiple') {
                var selectDate = this._getSelectedDate();
                if (selectDate.length == 1) {
                    return '开始';
                } else {
                    return selectDate[0] == selectDate[1] ? '开始' : '结束';
                }
            } else {
                return '';
            }
        }, // 区间日历时的特殊处理
        dateArea: 366, // 区间日历最多可选天数
        currentDate: '', // 当前日期
        holidays: {
            '2016-01-01': '元旦',
            '2016-02-07': '除夕',
            '2016-04-04': '清明',
            '2016-05-01': '劳动',
            '2016-06-09': '端午',
            '2016-09-15': '中秋',
            '2016-10-01': '国庆',
            '2016-12-25': '圣诞',
            '2017-01-01': '元旦',
            '2017-01-27': '除夕',
            '2017-04-04': '清明',
            '2017-05-01': '劳动',
            '2017-05-30': '端午',
            '2017-10-04': '中秋',
            '2017-10-01': '国庆',
            '2017-12-25': '圣诞',
            '2018-01-01': '元旦',
            '2018-02-15': '除夕',
            '2018-04-05': '清明',
            '2018-05-01': '劳动',
            '2018-06-18': '端午',
            '2018-09-24': '中秋',
            '2018-10-01': '国庆',
            '2018-12-25': '圣诞'
        },
        autoClose: true,
        // start: new Date(),
        // end: new Date(),
        oneHeight: 387,
        currScrollTop: 0,
        isOpen: false
    };

    /**
     * 日期工具类
     * @type {{add: Function, format: Function, compare: Function}}
     */
    var dateExtend = {
        /**
         * 增加或减少多少天
         * @param int day 负数表示－多少天，正数表示＋多少天
         */
        add: function (date, day) {
            return new Date(+new Date(date) + (parseInt(day, 10) || 0) * 24 * 60 * 60 * 1000);
        },

        /**
         * 格式化日期
         * @param  {[type]} format  YYYY-MM-DD hh:mm:ss
         * @return {[type]}        [description]
         */
        format: function (date, fmt) {
            date = new Date(date);
            var o = {
                "M+": date.getMonth() + 1, //月份
                "D+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(Y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }

            return fmt;
        },

        /**
         * 比较两个日期的大小
         * @param  {[type]} odate 被比较的日期
         * @return {[type]}       相差的豪秒数
         */
        compare: function (date, odate) {
            return +new Date(date) - (+new Date(odate) || 0);
        }
    };

    function Calendar(options) {
        this._init(options);
    }

    Calendar.prototype = {
        /**
         * 页面初始化
         * @return {[type]} [description]
         */
        _init: function (options) {
            // 初始化
            this._initSettings(options);
            // 生成日历
            this._showCalendar();
            // 绑定事件
            this._bindEvent();
        },

        /**
         * 初始化设置
         * @private
         */
        _initSettings: function (options) {
            this.settings = $.extend({}, config, options);
        },

        _getNextMonth: function (_currDate) {
            //console.log(_currDate);
            var year = _currDate.getFullYear(),
                month = _currDate.getMonth();
            return {year: year, month: month + 1};
        },
        _getPrevMonth: function (_currDate) {
            //console.log(_currDate);
            var year = _currDate.getFullYear(),
                month = _currDate.getMonth();
            return {year: year, month: month - 1};
        },
        /**
         * 生成日历
         * @return {[type]} [description]
         */
        _showCalendar: function () {
            var _this = this;
            // 增加星期
            /*if ($("#" + this.settings.calendarID).find('calendar-depTips').length == 0) {
             $("#" + this.settings.calendarID).append("");
             }*/
            var weekstr = '<div class="headerWeek tn-calendar-head"><div class="theme"><h1>选择日期</h1><i class="re-icon re-icon-point-left"></i></div><table><tbody><tr><th class="weekend">日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="weekend">六</th></tr></tbody></table></div>';
            var tips = "<div class='calendar-depTips'>请选择开始日期</div><div class='calendar-arrTips'>请选择结束日期</div>";
            var render = [];
            // 计算当前年月日
            var curDate = this.curDate = (this.settings.currentDate && new Date(this.settings.currentDate)) || new Date();
            // 循环生成3个月日历(上月本月下月)
            var year = curDate.getFullYear(),
                month = curDate.getMonth();
            for (var i = -1; i <= 1; i++) {
                var _month = month + i;
                render.push(this._render(year, _month));//传小一个月就是当前月
            }
            $(this.settings.el).append('<div id="' + this.settings.calendarID + '" class="app-calendar">' + tips + weekstr + '<div class="tn-container">' + render.join('') + '</div></div>');
        },

        /**
         * 日历的主体函数
         * @param  {[type]} y [description]
         * @param  {[type]} m [description]
         * @return {[type]}   [description]
         */
        _render: function (y, m) {
            // 日历头部
            var thead = ['<div class="tn-item-container"><div class="tn-c-header"><span class="tn-c-title" data-date="', '', '">', '', '</span></div>'];
            var ths = ['<div class="tn-c-body"><table>'];

            // 日历头部
            var cbody = this._getTds(y, m);
            thead[1] = cbody.time;//y + "-" + m + "-1";
            thead[3] = cbody.thead;
            ths = ths.concat(cbody.trs);

            // 闭合标签
            ths.push('</table></div></div>');
            return thead.concat(ths).join('');
        },

        /**
         * 日历主体函数
         * @param  {[type]} y [description]
         * @param  {[type]} m [description]
         * @return {[type]}   [description]
         */
        _getTds: function (y, m) {
            // 日历主体部分
            var date = new Date(y, m, 1);
            // 获取当月第一天星期几
            var fday = date.getDay();
            date = new Date(y, m + 1, 0);
            // 获取当月的天数
            var aday = date.getDate(),
                ayear = date.getFullYear(),
                amonth = date.getMonth();//小一月的数字值

            var tds = ['<tr>'],
                trs = [];
            // 计算当前多少日
            var iday, curday,
                curDate = this.curDate,
                minDate = this.settings.minDate,
                maxDate = this.settings.maxDate,
                stop = false;
            //42个格子
            for (var i = 1; i <= 42; i++) {
                iday = i - fday;
                curday = ayear + '-' + (amonth < 9 ? '0' : '') + ( amonth + 1 ) + '-' + (iday <= 9 ? '0' : '') + iday;
                if (i > fday && i <= (aday + fday)) {
                    var holidayStr = this.settings.holidays[curday] || '',
                        today = iday === new Date().getDate() && ayear === new Date().getFullYear() && amonth == new Date().getMonth();
                    // 可选日期
                    //console.log(i + "|" + maxDate + "|" + minDate + "|" + curday);
                    if ((!maxDate || maxDate >= curday) && (!minDate || minDate <= curday)) {
                        var _isWeekend = new Date(curday).getDay() == 6 || new Date(curday).getDay() == 0;
                        var className = '';
                        if (_isWeekend) {
                            className = 'weekend';
                        }
                        if (!today) {
                            tds.push('<td class="' + className + '" data-date="' + curday + '">' + (holidayStr ? ('<em class="top-center special">' + holidayStr + '</em>') : '') + '<p>' + iday + '</p></td>');
                        } else {
                            tds.push('<td class="' + className + '" today" data-date="' + curday + '"><p>今天</p></td>');
                        }
                    }
                    //不可选日期
                    else {
                        if (!today) {
                            tds.push('<td class="disabled" data-date="' + curday + '">' + iday + '</td>');
                        } else {
                            tds.push('<td class="today disabled" data-date="' + curday + '"><p>今天</p></td>');
                        }
                    }
                } else if (!stop) {
                    tds.push('<td></td>');
                }

                if (i % 7 === 0 && !stop) {
                    tds.push('</tr>');
                    trs = trs.concat(tds);

                    // 大于的日期不再换行
                    if (i >= (aday + fday)) {
                        stop = true;
                    }
                    !stop && (tds = ['<tr>']);
                }
            }

            // 设置头部
            // var months = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
            // var thead = months[amonth] + '月&nbsp;&nbsp;&nbsp;&nbsp;' + ayear;
            var andone = amonth + 1,
            // ay = andone != 13 ? ayear : ayear + 1,
            // am = andone != 13 ? andone : 1,
            // thead = ay + '年' + am + '月';
                thead = ayear + '年' + andone + '月';
            return {
                trs: trs,
                thead: thead,
                time: ayear + "-" + (andone <= 9 ? '0' : '') + andone + "-01"
            };
        },

        /**
         * 绑定选择事件
         * @return {[type]} [description]
         */
        _bindEvent: function () {
            var _this = this;
            var el = $(this.settings.el),
                container = $("#" + this.settings.calendarID + " .tn-container"),
                type = this.settings.type,
                dateArea = parseInt(this.settings.dateArea, 10),
                calendarDepTips = $(".calendar-depTips"),
                calendarArrTips = $(".calendar-arrTips");

            var tds = el.find('td');
            // 当天往返
            _this.daytoday = false;
            //返回按钮
            $(".re-icon-point-left").on("click", function () {
                $(this).parents(".app-calendar").fadeOut();
                //console.log('length:'+container.find("td.selected").length);
                if (container.find("td.selected").length == 1) {
                    container.find(".special").parent('td').removeClass('selected');
                    container.find(".special").remove();
                }
                _this.settings.isOpen = false;
                //恢复打开前滚轮高度
                $(window).scrollTop(_this.settings.currScrollTop);
                calendarDepTips.removeClass("fade-out").removeClass("fade-in");
                calendarArrTips.removeClass("fade-out").removeClass("fade-in");
            })
            //选择日期
            container.off('click').on('click', "tr td", function (e) {
                e.preventDefault();
                var node = $(this).closest('td'),
                    date = node.attr('data-date'),
                    type = _this.settings.type;

                if (node.hasClass('disabled')) {
                    return;
                }

                /*
                 Modified by North
                 2016/10/22
                 Fix bug : Prevent event when tapping on date cells out range of the calendar
                 */
                if (!date) {
                    return;
                }

                // 去除selected属性
                // 单个日历选择
                if (type == 'single') {
                    // 去掉提示语
                    container.find('.selected').find('em.tip').remove();
                    container.find('.selected').removeClass('selected');
                    _this.daytoday = false;
                    // 选择往返日历
                } else if (type == 'multiple') {
                    // 比较两个选中的日期
                    var selected = _this._getSelectedDate();
                    var days = dateExtend.compare(date, selected) / 24 / 60 / 60 / 1000;
                    // 最多可选择多少天
                    if (selected.length >= 2 || (selected.length == 1 && (days >= dateArea || days < 0))) {
                        // 去掉提示语
                        container.find('.selected').find('em.tip').remove();
                        container.find('.selected').removeClass('selected');
                        _this.daytoday = false;
                        // 支持当天往返
                    } else if (selected.length == 1 && days == 0) {
                        container.find('.selected').find('em.tip').remove();
                        _this.daytoday = !_this.daytoday;
                    }
                }

                container.find('.beselected').removeClass('beselected');

                // 增加selected属性
                $(this).addClass('selected');

                // 特殊滴，往返日历的中间日期样式
                var beSelected = _this._getSelectedDate();
                //console.log('a:'+beSelected.length);
                if (_this.settings.isOpen) {
                    if (beSelected.length == 1) {
                        calendarDepTips.addClass("fade-out").removeClass("fade-in")
                        calendarArrTips.addClass("fade-in");
                    } else {
                        calendarArrTips.removeClass("fade-in")
                    }
                }
                if (type == 'multiple' && beSelected.length == 2) {
                    var arr = [];
                    var min = beSelected[0],
                        max = beSelected[1];

                    var tem = new Date(min);
                    while (dateExtend.compare(tem, max) < 0) {
                        tem = dateExtend.add(tem, 1);
                        var fmtDate = dateExtend.format(tem, 'YYYY-MM-DD');
                        arr.push(fmtDate);
                    }

                    arr.forEach(function (item) {
                        container.find('[data-date="' + item + '"]').not('.disabled').not('.selected').addClass('beselected');
                    });
                }

                // 选择后对该节点的底部居中显示内容
                var bc = _this.settings.bottom_center;
                if (bc && typeof bc == 'function') {
                    bc = bc.call(_this, e);
                }
                $(node).append(bc ? '<em class="bottom-center tip special">' + bc + '</p>' : '');

                // 回调函数
                var type = _this.settings.type;
                if (_this.daytoday || ((type == 'single' && _this._getSelectedDate().length == 1) || (type == 'multiple' && _this._getSelectedDate().length == 2))) {
                    //是否自动关闭
                    if (_this.settings.isOpen && _this.settings.autoClose) {
                        $("#" + _this.settings.calendarID, el).fadeOut();
                        _this.settings.isOpen = false;
                        calendarDepTips.removeClass("fade-out").removeClass("fade-in");
                        calendarArrTips.removeClass("fade-out").removeClass("fade-in");
                        //恢复打开前滚轮高度
                        $(window).scrollTop(_this.settings.currScrollTop);
                    }
                    var callback = _this.settings.callback;
                    if (callback && typeof callback == 'function') {
                        //callback.call(_this, e);
                        if (_this._getSelectedDate().length == 2 && _this.settings.type == 'multiple' || _this.settings.type == 'single') {
                            //console.log('auto:'+_this._getSelectedDate().length);
                            callback(_this);
                        }
                    }
                }

            });
            //滚动加载
            var timerTop = null;
            var timerBottom = null;
            $(window).scroll(function () {
                if (!_this.settings.isOpen)
                    return;
                var curHeight = $("#" + _this.settings.calendarID).height(),
                    scrollHeight = $(this).scrollTop(),
                    screenHeight = window.innerHeight;

                var result = curHeight - scrollHeight - screenHeight; // 134
                // 向上滚动
                if (scrollHeight < 100) {
                    clearTimeout(timerTop);
                    timerTop = setTimeout(function () {
                        var first = $("#" + _this.settings.calendarID + " .tn-c-title:first").attr("data-date");
                        var _t = _this._getPrevMonth(new Date(first)),
                            _html = _this._render(_t.year, _t.month);
                        //console.log(_t);
                        container.prepend(_html);
                        $(window).scrollTop(_this.settings.oneHeight);
                    }, 100);
                }
                // 向下滚动
                else if (result < 100) {
                    clearTimeout(timerBottom);
                    timerBottom = setTimeout(function () {
                        var last = $("#" + _this.settings.calendarID + " .tn-c-title:last").attr("data-date");
                        var _t = _this._getNextMonth(new Date(last)),
                            _html = _this._render(_t.year, _t.month);
                        //console.log(_t);
                        container.append(_html);
                    }, 100);
                }
            });
        },
        /**
         * 获取被选中的日期
         * @return {[type]} [description]
         */
        _getSelectedDate: function () {
            // 获取被选中的节点
            var el = $(this.settings.el),
                _calendar = $("#" + this.settings.calendarID, el),
                selNodes = _calendar.find('.selected');

            var arr = [];
            selNodes.each(function (i, item) {
                arr.push($(item).attr('data-date'));
            });

            if (this.daytoday && arr.length == 1) {
                arr.push(arr[0]);
            }

            return arr;
        },
        /**
         * 外部方法，获取已选中的日期
         * @return {[type]} [description]
         */
        getSelectedDate: function () {
            var type = this.settings.type,
                dates = this._getSelectedDate();

            // if(type == 'single') {
            //     return dates[0];
            // } else {
            //     return dates;
            // }
            return dates;
        },
        /**
         * 外部方法，设置已选中日期，以','分割
         */
        setSelectedDate: function (dates) {
            var type = this.settings.type,
                el = $(this.settings.el),
                _calendar = $("#" + this.settings.calendarID, el);
            var datesArr = dates.split(',');
            if (type === 'single') {
                datesArr = datesArr.splice(0, 1);
            } else if (type === 'multiple') {
                datesArr = datesArr.splice(0, 2);
            }
            if (datesArr[0] == datesArr[1]) {
                datesArr.pop();
            }
            datesArr.forEach(function (item, i) {
                _calendar.find('[data-date="' + item + '"]').trigger('click', 'set');
            });

            return this;
        },
        /**
         * 价格日历
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        // load: function (data) {
        //     var el = $(this.settings.el);
        //     if (!data) {
        //         return;
        //     }
        //
        //     data.forEach(function (item, i) {
        //         if (!$('td[data-date="' + item.date + '"]', el).hasClass('disabled')) {
        //             $('td[data-date="' + item.date + '"]', el).find('.bottom-center').remove();
        //             $('td[data-date="' + item.date + '"]', el).append('<em class="bottom-center price ' + (item.isLowestPrice ? 'special' : '') + '">' + item.price + '</em>');
        //         }
        //     });
        // },
        removeDOM: function () {
            var el = $(this.settings.el);
            $("#" + this.settings.calendarID, el).remove();
        }
    };

    module.exports = Calendar;
});