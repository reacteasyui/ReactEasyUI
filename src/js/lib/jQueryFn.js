/**
 * 数字滚动显示
 * dep jsfunction.js
 */
$.fn.changeNumber = function (options) {
    var defaults = {
            count: 10,  //增长、减少次数
            minStep: 1, //最小步长
            step: 0,    //步长
            fixedNum: 0 //保留小数点位数
        },
        opts = $.extend(defaults, options),
        seconds = 1000 / opts.count,
        i = 0,
        _self = this;
    this.flag = null; //timeout flag
    if (!_self.length) return;
    opts.startNumber = "" + opts.startNumber || +_self.html().replace(/,/g, '');
    //保证如果是0也写入页面
    this.html(('' + opts.startNumber).formatNumber());
    if (opts.endNumber == opts.startNumber)
        return;
    //计算步长
    if (Math.abs(((opts.endNumber - opts.startNumber) / opts.count)).toFixed(opts.fixedNum) < opts.minStep) {
        if (opts.endNumber >= opts.startNumber) {
            opts.step = +opts.minStep;
        } else {
            opts.step = -opts.minStep;
        }
    } else {
        opts.step = +(((opts.endNumber - opts.startNumber) / opts.count).toFixed(opts.fixedNum));
    }
    drawNumber();
    function drawNumber() {
        if (i < opts.count) {
            if (!opts.fixedNum) {
                opts.startNumber = +opts.startNumber + opts.step;
            }
            else {
                opts.startNumber = +((opts.startNumber + opts.step).toFixed(opts.fixedNum));
            }
            if (i == opts.count - 1 || (opts.step > 0 && opts.startNumber >= opts.endNumber) || (opts.step < 0 && opts.startNumber <= opts.endNumber)) {
                opts.startNumber = opts.endNumber;
                _self.html(('' + opts.startNumber).formatNumber());
                clearTimeout(opts.flag);
            } else {
                i++;
                _self.html(('' + opts.startNumber).formatNumber());
                this.flag = setTimeout(drawNumber, seconds);
            }
            // console.log(opts.startNumber);
        }
    }
}
$.fn.funnel = function (options) {
    console.log(options);
    var _this = this;
    var defaults = {
        data: [
            {
                name: "线索",
                count: 0
            }, {
                name: "有效",
                count: 0
            }, {
                name: "留档",
                count: 0
            }, {
                name: "到店",
                count: 0
            }, {
                name: "成交",
                count: 0
            }],
        color: ["#0572d0", "#2a97f5", "#00b0fa", "#25d0ef", "#30d6cd"],
        width: 60
    };
    var opts = $.extend({}, defaults, options);
    var _html = '<div style="width:150px;height:212px;float: left"><div id="trapezoid1"></div> <div id="trapezoid2"></div> <div id="trapezoid3"></div> <div id="trapezoid4" ></div> <div id="trapezoid5" ></div> </div>';
    _this.html(_html);

    var trapezoid1 = $('#trapezoid1');
    var trapezoid2 = $('#trapezoid2');
    var trapezoid3 = $('#trapezoid3');
    var trapezoid4 = $('#trapezoid4');
    var trapezoid5 = $('#trapezoid5');

    var data = opts.data;
    var color = opts.color;

    var c = {};
    var count = 0;
// 销售转化
    for (var i = 0; i < data.length; i++) {
        var o = data[i];
        var _count = (typeof o.count === 'string') ? parseInt(o.count) : o.count;
        switch (o.name) {
            case '线索数':
                count += _count;
                c.a = _count;

                break;
            case '下发数':
                c.b = _count;
                count += _count;

                break;
            case '有效留档数数':
                c.c = _count;
                count += _count;

                break;
            case '有效留档数':
                c.c = _count;
                count += _count;

                break;
            case '到店数':
                c.d = _count;
                count += _count;

                break;
            case '成交数':
                c.e = _count;
                count += _count;
                break;
        }
    }
    console.log(c);
    console.log(1);

    var tH = 130;
    var it = 1; // 间隔 * 2
    var _1h = c.a / count * tH;
    _1h = _1h == 0 ? 0 : (_1h < 1 ? 1 : _1h);
    var _w = opts.width; // 初始宽度
    if (count / c.a < 2)_w = _w * (count - c.a) / c.a;


    trapezoid1.css('border-top', _1h + 'px solid' + color[0]);
    var _1l = (_1h < 3 ? 3 : _1h) * 0.4 - it;

    trapezoid1.css('border-left', _1l + 'px solid transparent');
    trapezoid1.css('border-right', _1l + 'px solid transparent');

    trapezoid1.css('width', _w + 'px');
    trapezoid1.css('margin', '0 auto').css("boxSizing", "content-box");


    var lw = _w;

    var _2h = c.b / count * tH;
    _2h = _2h == 0 ? 0 : (_2h < 1 ? 1 : _2h);
    trapezoid2.css('border-top', _2h + 'px solid' + color[1]);

    _1l = (_2h < 3 ? 3 : _2h) * 0.4 - it;
    trapezoid2.css('border-left', _1l + 'px solid transparent');
    trapezoid2.css('border-right', _1l + 'px solid transparent');
    if (_1l < 0) _1l = -1 * _1l;

    _w = _w - 2 * _1l;
    _w = _w < 0 ? _w * -1 : _w;
    trapezoid2.css('width', _w + 'px');
    trapezoid2.css('margin', '5px auto').css("boxSizing", "content-box");

    var _lw = 2 * _1l + _w;
    if (_w >= lw) _w = lw;
    if (_lw > lw) {
        var _1l_ = (lw - _w) / 2;
        var __1l = _1l_ < 1 ? 1 : _1l_;
        trapezoid2.css('border-left', _1l + 'px solid transparent');
        trapezoid2.css('border-right', _1l + 'px solid transparent');

    }

    lw = _w;

    var _3h = c.c / count * tH;
    _3h = _3h == 0 ? 0 : (_3h < 1 ? 1 : _3h);
    trapezoid3.css('border-top', _3h + 'px solid' + color[2]);
    _1l = (_3h < 3 ? 3 : _3h) * 0.4 - it;
    trapezoid3.css('border-left', _1l + 'px solid transparent');
    trapezoid3.css('border-right', _1l + 'px solid transparent');

    if (_1l < 0) _1l = -1 * _1l;
    _w = _w - 2 * _1l;
    _w = _w < 0 ? _w * -1 : _w;
    trapezoid3.css('width', _w + 'px');
    trapezoid3.css('margin', '5px auto').css("boxSizing", "content-box");

    _lw = 2 * _1l + _w;
    if (_w >= lw) _w = lw;
    if (_lw > lw) {
        var _1l_ = (lw - _w) / 2;
        var __1l = _1l_ < 1 ? 1 : _1l_;
        trapezoid3.css('border-left', _1l + 'px solid transparent');
        trapezoid3.css('border-right', _1l + 'px solid transparent');
    }

    lw = _w;

    var _4h = c.d / count * tH;
    _4h = _4h == 0 ? 0 : (_4h < 1 ? 1 : _4h);
    trapezoid4.css('border-top', _4h + 'px solid' + color[3]);
// _1l = _4h * 0.4 - it;
    _1l = (_4h < 3 ? 3 : _4h) * 0.4 - it;
    trapezoid4.css('border-left', _1l + 'px solid transparent');
    trapezoid4.css('border-right', _1l + 'px solid transparent');
    if (_1l < 0) _1l = -1 * _1l;
    _w = _w - 2 * _1l;
    _w = _w < 0 ? _w * -1 : _w;
    trapezoid4.css('width', _w + 'px');
    trapezoid4.css('margin', '5px auto').css("boxSizing", "content-box");

    _lw = 2 * _1l + _w;
    if (_w >= lw) _w = lw;
    if (_lw > lw) {
        var _1l_ = (lw - _w) / 2;
        var __1l = _1l_ < 1 ? 1 : _1l_;
        trapezoid4.css('border-left', _1l + 'px solid transparent');
        trapezoid4.css('border-right', _1l + 'px solid transparent');
    }

    lw = _w;

    var _5h = c.e / count * tH;
    _5h = _5h == 0 ? 0 : (_5h < 1 ? 1 : _5h);
    trapezoid5.css('border-top', _5h + 'px solid' + color[4]);
// _1l = _5h * 0.4 - it;
    _1l = (_5h < 3 ? 3 : _5h) * 0.4 - it;
    if (_5h < 2) _1l = 1;
    trapezoid5.css('border-left', _1l + 'px solid transparent');
    trapezoid5.css('border-right', _1l + 'px solid transparent');
    if (_1l < 0) _1l = -1 * _1l;
    _w = _w - 2 * _1l;

    _w = _w < 0 ? _w * -1 : _w;

    trapezoid5.css('width', _w + 'px');
    trapezoid5.css('margin', '5px auto').css("boxSizing", "content-box");

    _lw = 2 * _1l + _w;
    if (_w >= lw) _w = lw;
    if (_lw > lw) {
        var _1l_ = (lw - _w) / 2;
        var __1l = _1l_ < 1 ? 1 : _1l_;

        trapezoid5.css('border-left', _1l + 'px solid transparent');
        trapezoid5.css('border-right', _1l + 'px solid transparent');
    }
}

$.fn.funnel_self=function(options){
    var _this=this;
    var defaults={
        width:90,
        height:130,
        sepHeight:5,
        color:'#009bf7',
        background:'#171D2D',
        data:[1215,880,120,400,200]
    };

    var option=$.extend({}, defaults, options);

    var H = option.height,G =option.sepHeight,data=option.data;
    // console.log(data);
    var n = 0,sum = 0,pure=[];
    for (var i = 0; i < data.length; i++) {
        if (+data[i] == 0)n++;
        else pure.push(+data[i]);
        sum += +(data[i]);
    }

    var str='';
    // console.log(n);
    for (var i=1;i<pure.length;i++){
        str+='<div class="line line'+i+' "></div>';
    }

    var html='<div class="funnel_self"><div class="bblock"></div>'+str+'</div>';

    _this.html(html);

    $(".funnel").css({
        position:'relative'
    })
    $(".bblock").css({
        background: option.background,
        width: option.width,
        position: 'relative',
        width: 0,
        borderLeft: option.width/2+'px solid transparent',
        borderRight: option.width/2+'px solid transparent',
        borderTop: option.height+'px solid '+option.color
    });
    $(".line").css({
        position: 'absolute',
        width:option.width,
        borderTop: option.sepHeight+'px solid '+option.background
    });



    var H_total = H - (G * (pure.length-1));

    var aheadH=0,top=[];

    for (var j=0;j<pure.length;j++){
        // console.log((H_total*pure[j]/+sum+G+aheadH));
        top.push(H_total*pure[j]/sum+aheadH);
        $(".line"+(j+1)).css({top:top[j]});
        aheadH=top[j]+G;
    }
}

/**
 * 提示框
 * dep
 @class $.alert
 @extends bootstrap.js & bootstrap.css
 @param msg {String} 提示文字
 @param [delay] {Number} 多长时间之后关闭，单位：ms
 @param [callback] {Function} 回调函数
 @return 返回Alert
 */
$.alert = function (msg, delay, callback) {
    var _alert = '<div role="alert" class="alert alert-info alert-dismissable">'
            + '<button type="button"  class="close" aria-hidden="true" tabindex="-1"><span>×</span></button><span>'
            + msg
            + '</span><button type="button" class="close sr-only"></button></div>',
        $alert = $(".alert");
    if ($alert.length)
        $alert.remove();
    $("body").append(_alert);
    //插入后获取对象
    $alert = $(".alert");
    $alert.on("click", ".close", function () {
        $alert.alert("close");
        console.log(callback);
        if (callback)
            callback();
    });
    //默认俩秒后关闭
    setTimeout(function () {
        $alert.alert("close");
        console.log(callback);
        if (callback)
            callback();
    }, delay || 2000)
}