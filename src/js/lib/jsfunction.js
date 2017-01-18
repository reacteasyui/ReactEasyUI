/*
 * source   : jsfunction.js
 * Version  : beta 1.1.2
 * depends  : Jquery 1.4+
 * Download : http://www.itbbb.com/jsfunction/jsfunction.js
 *
 * Author   : North
 * Blog     : http://www.itbbb.com
 * Wechat   : ITbeibei
 * Email    : babyisun@qq.com
 *
 * create   : 2014/03/29
 * update   : 2017/1/10
 *
 * message  : 如果发现任何bug、需要完善的代码，请发邮件或通过微信联系我，我很高兴与大家一起整理优雅的代码.
 **/
if (typeof jQuery === 'undefined') {
    throw new Error('JSFunction requires jQuery 1.4+');
}
$.extend({
    JSFunction: {
        version: 1.0,
        author: "baby"
    }
});
window.JSF = $.JSFunction;
/*Base*/
+function ($) {
    Function.prototype.fn = function (name, fun) {
        if (!this.prototype[name]) {
            this.prototype[name] = fun;
        }
        return this;
    }
}(jQuery);
/*Cookie*/
+function ($) {
    'use strict';

    var cookie = {
        get: function (name) {
            var cookieValue = "";
            var search = name + "=";
            if (document.cookie.length > 0) {
                var offset = document.cookie.indexOf(search),
                    end;
                if (offset != -1) {
                    offset += search.length;
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1)
                        end = document.cookie.length;
                    cookieValue = unescape(document.cookie.substring(offset, end));
                }
            }
            return cookieValue;
        },
        set: function (name, value, time, timetype, domain) {
            var expire = "",
                dm = "",
                timet = {
                    day: 86400000,
                    hour: 3600000,
                    minute: 60000,
                    seconds: 1000
                };
            if (time) {
                if (!timetype) timetype = "hour";
                expire = new Date((new Date()).getTime() + time * timet[timetype]);
                expire = "; expires=" + expire.toGMTString();
            }
            if (domain) {
                dm = "; domain=" + domain;
            }
            document.cookie = name + "=" + escape(value) + expire + ";path=/" + dm;
        },
        remove: function (name) {
            this.set(name, null, -1);
        }
    };

    window.JSF.cookie = $.cookie = cookie;

}(jQuery);
/*LocalData*/
+function ($) {
    'use strict';

    var localData = {
        dataDom: null,
        dataName: location.hostname ? location.hostname : 'localUserData',
        Init: function () {
            if (!this.dataDom) {
                try {
                    this.dataDom = document.createElement('input');
                    this.dataDom.type = 'hidden';
                    this.dataDom.style.display = "none";
                    this.dataDom.addBehavior('#default#userData'); //userData的语法
                    document.body.appendChild(this.dataDom);
                    this.dataDom.expires = new Date($.date().addDays(365)).toUTCString(); //设定过期时间

                    //加载userdata
                    this.dataDom.load(this.dataName);
                } catch (e) {
                    console.log("当前环境无法使用,The system cannot be used.");
                    return false;
                }
            }
            return true;
        },
        get: function (name) {
            if (window.localStorage) {
                return window.localStorage.getItem(name);
            } else {
                if (this.Init()) {
                    //this.dataDom.load(this.dataName);
                    return this.dataDom.getAttribute(name);
                }
            }
        },
        set: function (name, value) {
            if (window.localStorage) {
                window.localStorage.setItem(name, value);
            } else {
                if (this.Init()) {
                    //this.dataDom.load(this.dataName);
                    this.dataDom.setAttribute(name, value);
                    this.dataDom.save(this.dataName);
                }
            }
        },
        remove: function (name) {
            if (window.localStorage) {
                localStorage.removeItem(name);
            } else {
                if (this.Init()) {
                    //this.dataDom.load(this.dataName);
                    this.dataDom.removeAttribute(key);
                    this.dataDom.save(this.dataName);
                }
            }
        },
        removeAll: function () {
            if (window.localStorage) {
                localStorage.clear();
            } else {
                if (this.dataDom) {
                    $(this.dataDom).remove();
                }
            }
        }
    };

    window.JSF.localData = $.localData = localData;
}(jQuery);
/*Browser*/
+function ($) {
    'use strict';

    var browser = {
            webkit: false,
            /*opera: false,*/ msie: false,
            firefox: false
        },
        ua = window.navigator.userAgent.toLowerCase();
    if (!$.browser) {
        // Useragent RegExp
        var rwebkit = /(webkit)[ \/]([\w.]+)/,
        /*ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,*/
            rmsie = /(msie) ([\w.]+)/,
            rfirefox = /(firefox)\/([\d.]+)/,
        //rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
            ie11 = /(trident)(?:.*? rv:([\w.]+))?/,
            uaMatch = function () {
                var match = rwebkit.exec(ua) ||
                    /*ropera.exec(ua) ||*/
                    rmsie.exec(ua) ||
                    rfirefox.exec(ua) ||
                    //ua.indexOf("compatible") < 0 && rmozilla.exec(ua) ||
                    ie11.exec(ua) ||
                    [];
                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            },
            browserMatch = uaMatch();
        if (browserMatch.browser) {
            //对ie11做出的修正
            if (browserMatch.browser == "trident")
                browserMatch.browser = "msie";
            //if (browserMatch.browser == "mozilla" && (!!window.ActiveXObject || "ActiveXObject" in window)) {
            //    browser["msie"] = true;
            //}
            //else
            browser[browserMatch.browser] = true;
            browser.version = browserMatch.version;
        }
    } else {
        browser = $.browser;
    }

    browser.ie6 = browser.msie && (browser.version == "6.0");
    browser.mobile = ua.match(/ipad/i) == "ipad" || ua.match(/iphone os/i) == "iphone os" || ua.match(/midp/i) == "midp" || ua.match(/rv:1.2.3.4/i) == "rv:1.2.3.4" || ua.match(/ucweb/i) == "ucweb" || ua.match(/android/i) == "android" || ua.match(/windows ce/i) == "windows ce" || ua.match(/windows mobile/i) == "windows mobile";

    window.JSF.browser = $.browser = browser;
}(jQuery);
/*Date*/
+function ($) {
    'use strict';

    //初始化时间
    $.date = function (date) {
        return !date ? new Date() : typeof date == "string" ? new Date(date.replace(/-/g, "\/")) : new Date(date);
    };
    //格式化日期
    //$.date.Format("yyyy-MM-dd")
    //Date.prototype.format = function (fmt) {
    Date.fn("format", function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    });

    Date.fn("addMseconds", function (milliseconds) {
        var m = this.getTime() + milliseconds;
        return new Date(m);
    });

    Date.fn("addSeconds", function (second) {
        return this.addMseconds(second * 1000);
    });

    Date.fn("addMinutes", function (minute) {
        return this.addSeconds(minute * 60);
    });

    Date.fn("addHours", function (hour) {
        return this.addMinutes(60 * hour);
    });

    //加天数
    Date.fn("addDays", function (d) {
        this.setDate(this.getDate() + d);
        return this;
    });

    //加周数
    Date.fn("addWeeks", function (w) {
        return this.addDays(w * 7);
    });

    //加月数
    Date.fn("addMonths", function (m) {
        var d = this.getDate();
        this.setMonth(this.getMonth() + m);
        if (this.getDate() < d)
            this.setDate(0);
        return this;
    });

    //加年数
    Date.fn("addYears", function (y) {
        var m = this.getMonth();
        this.setFullYear(this.getFullYear() + y);
        if (m < this.getMonth()) {
            this.setDate(0);
        }
        return this;
    });

    //星期几
    Date.fn("getWeek", function (type) {
        var i = this.getDay();
        if (!type || type == "周" || type == "星期") {
            var nums = ["日", "一", "二", "三", "四", "五", "六"];
            type = type || "周";
            return type + nums[i];
        } else if (type == "En") {
            var ennmae = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            return ennmae[i];
        } else if (type == "Short") {
            var enshortname = ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."];
            return enshortname[i];
        }
    });

    //获取周的7日数组
    Date.fn("currentWeek", function () {
        var now = this.getDay(), arr = [];
        now = now == 0 ? 7 : now;
        var sunday = this.addDays(-now);
        for (var i = 1; i <= 7; i++) {
            arr.add(new Date(sunday.addDays(1)));
        }
        return arr;
    });

    //获取周岁
    Date.fn("getAge", function () {
        var Age = 0,
            now = $.date(),
            birthYear = this.getFullYear(),
            birthMonth = this.getMonth(),
            birthDay = this.getDate(),
            nowYear = now.getFullYear(),
            nowMonth = now.getMonth(),
            nowDay = now.getDate();

        var ageDiff = nowYear - birthYear;
        if (ageDiff == 0) {
            Age = 0; //同年 则为0岁
        } else {
            if (ageDiff > 0) {
                var monthDiff = nowMonth - birthMonth;
                if (monthDiff == 0) {
                    if ((nowDay - birthDay) < 0)
                        Age = ageDiff - 1;
                    else
                        Age = ageDiff;
                } else {
                    if (monthDiff < 0)
                        Age = ageDiff - 1;
                    else
                        Age = ageDiff;
                }
            } else {
                Age = "未出生"; //返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return Age; //返回周岁年龄
    });

    //是否是闰年
    Date.fn("isLeapYear", function () {
        var year = this.getFullYear();
        return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))
    });
    //该月有多少天
    Date.fn("daysInMonth", function () {
        var month = this.getMonth() + 1;
        if (month != 2)
            return ((month <= 7 && month % 2 == 1) || (month > 7 && month % 2 == 0)) ? 31 : 30;
        else return this.isLeapYear() ? 29 : 28;
    });

    //获取日期差
    $.diffDate = function (startTime, endTime, diffType) {
        var timet = {
            day: 86400000,
            hour: 3600000,
            minute: 60000,
            seconds: 1000
        };
        if (typeof startTime == "string")
            startTime = $.date(startTime);
        if (typeof endTime == "string")
            endTime = $.date(endTime);
        diffType = diffType || "day";
        return parseInt((endTime.getTime() - startTime.getTime()) / parseInt(timet[diffType]));
    };
    //倒计时
    $.countDown = function (opt) { //# 倒计时
        var option = {
                second: 0 //倒计时的秒数
                ,
                startTime: $.date() //当前时间, ，2013/02/01 18:30:30
                ,
                endTime: 0 //截止时间 ，2013/02/01 18:30:30
                ,
                interval: 1 //间隔回调时间，秒
                ,
                started: function () {
                } //开始回调
                ,
                timed: function (times) {
                } //每次回调
                ,
                finaled: function () {
                } //完成后回调
            },
            opts = {},
            timer = null;
        opts = $.extend(option, opt);
        if (opts.second) {
            opts.startTime = $.date();
            opts.endTime = $.date().addSeconds(opts.second);
        }
        timer = setInterval(loop, opts.interval * 1e3);
        //if (opts.started)
        opts.started();
        // 循环
        function loop() {
            var ts = opts.endTime - opts.startTime //计算剩余的毫秒数
                ,
                dd = parseInt(ts / 8.64e7) //计算剩余的天数
                ,
                hh = parseInt(ts / 3.6e7 % 24) //计算剩余的小时数
                ,
                mm = parseInt(ts / 6e4 % 60) //计算剩余的分钟数
                ,
                ss = parseInt(ts / 1e3 % 60) //计算剩余的秒数
                ,
                times = {
                    day: dd,
                    hours: hh,
                    minutes: mm,
                    seconds: ss
                };
            //当前时间递减
            opts.startTime = opts.startTime.addSeconds(opts.interval);
            //if (opt.timed)
            opts.timed(times);
            if (ts <= 0) {
                clearInterval(timer);
                //if (opts.finaled)
                opts.finaled();
            }
        }
    }
}(jQuery);
/*String*/
+function ($) {
    'use strict';

    //替换所有 *当涉及到正则关键字的时候需要特殊处理，如替换“\\|”
    String.fn("replaceAll", function (s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
    });

    //去除前后空格
    String.fn("trim", function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    });

    // 从左截取指定长度的字串
    String.fn("left", function (n) {
        return this.slice(0, n);
    });
    // 从右截取指定长度的字串
    String.fn("right", function (n) {
        return this.slice(this.length - n);
    });

    //字符串转换时间 &依赖于Date扩展
    String.fn("toDate", function (v) {
        var d = $.date(this);
        if (v)
            return d.format(v);
        return d;
    });

    //判断字符串是否是日期
    String.fn("isDate", function () {
        var r = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null)
            return false;
        var d = new Date(r[1], r[3] - 1, r[4]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    });
    //日期比较
    String.fn("compareDate", function (v2) {
        if (!this.isDate() || !v2.isDate())
            return false;
        var d1 = new Date(this.replace(/-/g, "\/")),
            d2 = new Date(v2.replace(/-/g, "\/"));
        return (d1 > d2);
    });

    //格式化数字字符串
    String.fn("formatNumber", function () {
        if (!isNaN(+this) && typeof +this == "number") {
            var temp = this.split("."), len = temp[0].length,
                num = temp[0].split("").reverse(), s1 = [];
            for (var i = 0; i < len; i++) {
                s1.push(num[i]);
                if (i % 3 == 2 && i != len - 1)
                    s1.push(",");
            }
            temp[0] = s1.reverse().join("");
            return temp.join(".");
        } else {
            return this;
        }
    });

    // HTML编码
    String.fn("htmlEncode", function () {
        var t = document.createElement("div");
        (t.textContent != null) ? (t.textContent = this) : (t.innerText = this);
        var o = t.innerHTML;
        t = null;
        return o;
    });
    // HTML反编码
    String.fn("htmlDecode", function () {
        var t = document.createElement("div");
        t.innerHTML = this;
        var o = t.innerText || t.textContent;
        t = null;
        return o;
    });

}(jQuery);
/*Array*/
+function ($) {
    'use strict';

    //Add方法
    Array.fn("add", function (item) {
        this.push(item);
        return this;
    });

    //Add集合
    Array.fn("addRange", function (items) {
        var length = items.length;
        if (length) {
            for (var index = 0; index < length; index++) {
                this.push(items[index]);
            }
        }
        return this;
    });


    Array.fn("forEach", function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    });


    //清空
    Array.fn("clear", function () {
        if (this.length > 0) {
            this.splice(0, this.length);
        }
        return this;
    });

    //判断是否为空
    Array.fn("isEmpty", function () {
        return this.length == 0;
    });

    //获取项目索引
    Array.fn("indexOf", function (item) {
        var length = this.length;
        if (length != 0) {
            for (var index = 0; index < length; index++) {
                if (this[index] == item) {
                    return index;
                }
            }
        }
        return -1;
    });

    //判断项是否在数组中
    Array.fn("contains", function (item) {
        var index = this.indexOf(item);
        return (index >= 0);
    });


    //插入项
    Array.fn("insert", function (index, item) {
        return this.splice(index, 0, item);
    });

    //出队
    Array.fn("dequeue", function () {
        return this.shift();
    });

    //通过项目删除某项
    Array.fn("remove", function (item) {
        var index = this.indexOf(item);
        if (index >= 0) {
            this.splice(index, 1);
        }
        return this;
    });

    //通过索引删除某项
    Array.fn("removeAt", function (index) {
        this.splice(index, 1);
        return this;
    });

    Array.fn("reverse", function () {
        var retVal = new Array(),
            len = this.length;
        for (var i = len - 1; i > -1; i--)
            retVal[retVal.length] = this[i];
        return retVal;
    });

    Array.fn("skip", function (count) {
        var len = this.length,
            newArray = new Array();
        for (var i = count; i < len; i++) {
            if (i < len) {
                newArray[newArray.length] = this[i];
            }
        }
        return newArray;
    });

    Array.fn("take", function (count) {
        var len = this.length,
            newArray = new Array();
        for (var i = 0; i < count; i++) {
            if (i < len) {
                newArray[newArray.length] = this[i];
            }
        }
        return newArray;
    });
    //Linq
    //条件查询
    Array.fn("where", function (clause) {
        if (!clause)
            return this;
        var len = this.length,
            newArray = new Array();
        for (var i = 0; i < len; i++) {
            if (clause(this[i], i)) {
                newArray[newArray.length] = this[i];
            }
        }
        return newArray;
    });

    Array.fn("joinKey", function (key) {
        var len = this.length,
            newArray = new Array();
        if (key) {
            for (var i = 0; i < len; i++) {
                var item = this[i][key];
                if (item) {
                    newArray[newArray.length] = item;
                }
            }
        }
        return newArray;
    });

    Array.fn("removeByKey", function (key, arr) {
        if (key && arr && arr.length) {
            return this.where(function (item, index) {
                return !arr.contains(item[key]);
            });
        }
        return this;
    });

    Array.fn("first", function (clause) {
        var len = this.length;
        if (clause != null) {
            return this.where(clause).first();
        } else {
            if (len > 0)
                return this[0];
            else
                return null;
        }
    });

    Array.fn("last", function (clause) {
        var len = this.length;
        if (clause != null) {
            return this.where(clause).last();
        } else {
            if (len > 0)
                return this[len - 1];
            else
                return null;
        }
    });

    Array.fn("any", function (clause) {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            if (clause(this[i], i)) {
                return true;
            }
        }
        return false;
    });

    Array.fn("all", function (clause) {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            if (!clause(this[i], i)) {
                return false;
            }
        }
        return true;
    });

    Array.fn("count", function (clause) {
        if (clause == null)
            return this.length;
        else
            return this.where(clause).length;
    });

    Array.fn("orderBy", function (clause) {
        var len = this.length,
            tempArray = new Array();
        for (var i = 0; i < len; i++) {
            tempArray[tempArray.length] = this[i];
        }
        tempArray.sort(function (a, b) {
            var x = clause(a);
            var y = clause(b);
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        return tempArray;
    });

    Array.fn("orderByDescending", function (clause) {
        var len = this.length,
            tempArray = new Array();
        for (var i = 0; i < len; i++) {
            tempArray[tempArray.length] = this[i];
        }
        tempArray.sort(function (a, b) {
            var x = clause(b);
            var y = clause(a);
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        return tempArray;
    });

    Array.fn("max", function (clause) {
        var maxValue, len = this.length,
            item = this[0];
        if (len == 0)
            return null;
        if (len == 1)
            return item;
        maxValue = clause(item, 0);
        for (var i = 1; i < len; i++) {
            var temp = clause(this[i], i);
            if (maxValue < temp) {
                //maxValue = temp;
                item = this[i];
            }
        }
        return item;
    });
    Array.fn("min", function (clause) {
        var minValue, len = this.length,
            item = this[0];
        if (len == 0)
            return null;
        if (len == 1)
            return item;
        minValue = clause(item, 0);
        for (var i = 1; i < len; i++) {
            var temp = clause(this[i], i);
            if (minValue > temp) {
                //maxValue = temp;
                item = this[i];
            }
        }
        return item;
    });

    Array.fn("sum", function (clause) {
        var sumValue = 0,
            len = this.length,
            item = this[0];
        for (var i = 0; i < len; i++) {
            var temp = clause(this[i], i);
            if (/[^\d]/.test(temp)) {
                throw new TypeError("类型错误");
                return 0;
            }
            sumValue += temp;
        }
        return sumValue;
    });

    //复杂数组对象去重
    Array.fn("distinct", function (clause) {
        var len = this.length;
        if (len < 2) return this;
        var dict = new Object(),
            retVal = new Array();
        //递归鸭子检测
        var _duckCheckObj = function (obj) {
            var v = "";
            if (typeof obj == "object") {
                for (var o in obj) {
                    if (typeof obj[o] == "object") {
                        v += _duckCheckObj(obj[o]);
                    } else {
                        v += o + obj[o];
                    }
                }
            } else
                v = obj;
            return v;
        };
        if (!clause) clause = function (item) {
            return item;
        };
        for (var i = 0; i < len; i++) {
            var arrobj = this[i],
                arrkey = clause(arrobj),
                key = _duckCheckObj(arrkey);
            if (dict[key] == null) {
                dict[key] = true;
                retVal[retVal.length] = arrobj;
            }
        }
        dict = null;
        return retVal;
    });

    //深度克隆
    Array.fn("clone", function () {
        var _duckclone = function (obj) {
            var v = new Object();
            if (typeof obj == "object") {
                for (var o in obj) {
                    if (typeof obj[o] == "object" && obj[o] != null) {
                        v[o] = _duckclone(obj[o]);
                    } else {
                        v[o] = obj[o];
                    }
                }
            } else
                v = obj;
            return v;
        };
        var clonearr = new Array(),
            len = this.length;
        for (var i = 0; i < len; i++) {
            var item = this[i];
            if (typeof item == "object") {
                item = _duckclone(item);
                clonearr.push(item);
            } else
                clonearr.push(item);
        }
        return clonearr;
    });


}(jQuery);


//Valid
+function ($) {
    'use strict';

    var regExp = {
        //that: [],
        init: function () {
            this.addData({
                key: "tel",
                regex: /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
                tip: "请输入有效的电话号码，如：010-59862221"
            }, {
                key: "mobile",
                regex: /(^0?[1][34578][0-9]{9}$)/,
                tip: "请输入有效的手机号码"
            }, {
                key: "email",
                regex: /^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/,
                tip: "请输入有效的邮件地址"
            }, {
                key: "mobileemail",
                regex: /(^0?[1][3458][0-9]{9}$)|(^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$)/,
                tip: "请输入有效的手机或邮箱"
            }, {
                key: "date",
                regex: /^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0?[13578]|1[02])-(0?[1-9]|[12][0-9]|3[01]))|((0?[469]|11)-(0?[1-9]|[12][0-9]|30))|(0?2-(0?[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-0?2-29))$/,
                tip: "请输入一个有效日期，如：2008-08-08"
            }, {
                key: "ip",
                regex: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                tip: "请输入有效的IP"
            }, {
                key: "chinese",
                regex: /^[\u4e00-\u9fa5]+$/,
                tip: "请输入中文"
            }, {
                key: "url",
                regex: "/^[a-zA-z]:\\/\\/[^s]$/",
                tip: "请输入有效的网址"
            }, {
                key: "zipcode",
                regex: /^\d{6}$/,
                tip: "请输入有效的邮政编码"
            }, {
                key: "qq",
                regex: /^[1-9]\d{4,11}$/,
                tip: "请输入有效的QQ号码"
            }, {
                key: "idcard",
                regex: /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/,
                tip: "请输入有效身份证"
            }, {
                key: "number",
                regex: /^[0-9]+$/,
                tip: "请输入数字"
            }, {
                key: "letter",
                regex: /^[a-zA-Z]+$/,
                tip: "请输入英文字母"
            }, {
                key: "word",
                regex: /^[0-9a-zA-Z]+$/,
                tip: "请输入英文字母和数字"
            }, {
                key: "required",
                regex: {
                    test: function (content, min, max) {
                        if (content.length) {
                            if (min)
                                if (content.length < min)
                                    return false;
                            if (max)
                                if (content.length > max)
                                    return false;
                        } else
                            return false;
                        return true;
                    }
                },
                tip: "请输入内容"
            });
        },
        _base: function (_args) {
            this.reg = _args.regex;
            this.tip = _args.tip;
            this.test = _args.key != "required" ? function (val) {
                return _args.regex.test(val);
            } : function (val, min, max) {
                return _args.regex.test(val, min, max);
            };
            return this;
        },
        addData: function () {
            for (var i in arguments) {
                this[arguments[i].key] = new this._base(arguments[i]);
            }
        }
    }
    regExp.init();
    $.regExp = regExp;
}(jQuery);


/*Url*/
+function ($) {
    'use strict';

    var url = {
        getArgs: function () {
            var args = new Object(),
                query = location.search.substring(1),
                pairs = query.split("&"),
                plength = pairs.length;
            for (var i = 0; i < plength; i++) {
                var pos = pairs[i].indexOf('=');
                if (pos == -1) continue;
                var argname = pairs[i].substring(0, pos),
                    value = pairs[i].substring(pos + 1);
                value = decodeURIComponent(value);
                args[argname] = value;
            }
            return args;
        },
        addFav: function (url, title, error) { //#加入收藏夹
            if (!url)
                url = window.location.href;
            if (!title)
                title = document.title;
            try {
                window.external.addFavorite(url, title);
            } catch (e) {
                try {
                    window.sidebar.addPanel(title, url, '');
                } catch (e) {
                    if (error)
                        error(e);
                }
            }
        },
        parse: function (url) { //# 解析URL
            var a = document.createElement('a');
            url = url || document.location.href;
            a.href = url;
            return {
                source: url,
                protocol: a.protocol.replace(':', ''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                file: (a.pathname.match(/([^\/?#]+)$/i) || [, ''])[1],
                hash: a.hash.replace('#', ''),
                path: a.pathname.replace(/^([^\/])/, '/$1'),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
                segments: a.pathname.replace(/^\//, '').split('/')
            };
        },
        addCss: function (path) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },
        addJs: function (path, callback) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = path;
            script.type = 'text/javascript';
            head.appendChild(script);
            if (!callback)
                return;
            if (!/*@cc_on!@*/0) { //if not IE
                //Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
                script.onload = function () {
                    callback();
                }
            } else {
                //IE6、IE7 support js.onreadystatechange
                script.onreadystatechange = function () {
                    if (js.readyState == 'loaded' || js.readyState == 'complete') {
                        callback();
                    }
                }
            }
        },
        open: function (url) {
            var linkObj = $("#open_instead_Link");
            if (!linkObj.length) {
                linkObj = $("<a id='open_instead_Link' href='javascript:;' target='_blank' onClick='window.open(this.href); return false;' ></a> ").appendTo("body");
                //linkObj = $("<form id='open_instead_Link' action='this.href' target='_blank'></form> ").appendTo("body");
            }
            linkObj.attr("href", url).trigger('click');
            //$("body").one("mouseover", function () {
            //    linkObj.attr("action", url).submit();
            //});
        }
    }

    window.JSF.url = $.url = url;
}(jQuery);
/*Jquery fn*/
+function ($) {
    'use strict';

    /**
     * 抓取form表单数据
     * $(form).getFormData()
     */
    $.fn.getFormData = function () {
        var inputs = $(this).find("input,select,textarea");
        var data = "",
            txt, type, name, read, i = 0;
        for (; i < inputs.length; i++) {
            type = inputs[i].type;
            read = inputs[i].getAttribute("data-read");
            if (type == "button" || type == "submit" || type == "image" || type == "reset" || read == "ignore")
                continue;
            name = inputs[i].name;
            if (data != "" && data.substring(data.length - 1, data.length) != "&") {
                data += "&";
            }
            if (type == "radio" || type == "checkbox") {
                if (txt != name) {
                    txt = name;
                    var cval = "";
                    if (type == "radio") {
                        cval = $("input:radio[name='" + name + "']:checked").val();
                        data += name + "=" + (cval ? encodeURIComponent(cval) : "");
                    } else {
                        $("[name='" + name + "']:checked").each(function () {
                            cval += $(this).val() + ",";
                        });
                        data += name + "=" + (cval ? cval.substring(0, cval.length - 1) : "");
                    }
                }
            } else {
                data += name + "=" + encodeURIComponent(inputs[i].value);
            }
        }
        return data;
    };

    /**
     * 让ie支持placeholder
     * $("input").placeholder();
     */
    $.fn.placeholder = function (options) {
        if ("placeholder" in document.createElement("input")) {
            return this; //如果原生支持placeholder属性，则返回对象本身
        } else {
            var _fun = function (placeholder, val) {
                if (val)
                    placeholder.css({
                        display: 'none'
                    });
                else
                    placeholder.css({
                        display: 'inline'
                    });
            };
            return this.each(function () {
                var input = $(this),
                    text = input.attr('placeholder');
                if (!text) return;
                var pdl = 5,
                    height = input.outerHeight(),
                    width = input.outerWidth(),
                    placeholder = $('<span class="jsf_placeholder">' + text + '</span>'),
                    pdlcss = input.css('padding-left');
                if (pdlcss) {
                    pdl = pdlcss.match(/\d*/i)[0] * 1;
                }
                //try {
                //    pdl = input.css('padding-left').match(/\d*/i)[0] * 1;
                //} catch (e) {
                //    pdl = 5;
                //}
                var _default = {
                    'margin-left': -(width - pdl),
                    'height': height,
                    'line-height': height + "px",
                    'position': 'absolute',
                    'color': "#cecfc9",
                    'font-size': "12px"
                };

                options = $.extend(_default, options);

                placeholder.css(options).click(function () {
                    input.focus();
                });
                _fun(placeholder, input.val());
                placeholder.insertAfter(input);
                input.keyup(function (e) {
                    _fun(placeholder, $(this).val());
                }).blur(function () {
                    _fun(placeholder, $(this).val());
                });
            });
        }
    };

}(jQuery);