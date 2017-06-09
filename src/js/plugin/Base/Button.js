$(function () {
	$.fn.addAnimate = function (options) {
    var defaults = {
            type: 'hover',//鼠标事件 hover| click
            animate: 'square', //动画种类 square | circle | circle-border
            shadeColor: '',//遮罩颜色 默认自动计算
        },
        opts = $.extend(defaults, options);
    if (opts.shadeColor != '') {
        this.attr('data-shadecolor', opts.shadeColor);
    };
    if (opts.animate == 'square') {
        var _type = opts.type == 'hover' ? 'mouseenter mouseleave' : opts.type;
        this.on(_type, function (e) {
            commonCore(e,$(this));
        })
    } else if (opts.animate == 'circle-border') {
        this.on(opts.type, function (e) {
            $(this).addClass('shape-circle-click-effect');
            delayTime(800);
        })
    } else if (opts.animate == 'circle') {
        this.on(opts.type, function (e) {
            $(".pulse").remove();
            $(this).append('<div class="pulse"></div>');
            var buttonWidth = $(this).width(),
                buttonHeight = $(this).height();
            $(this).find('.pulse').css({
                width: buttonWidth,
                height: buttonHeight,
                background: e.currentTarget.getAttribute('data-shadecolor')
            });
        })
    }
};


function delayTime(t) {
    setTimeout(function () {
        $('.shape-circle-click').removeClass('shape-circle-click-effect')
    }, t);
}

function calcColor(num, value) {
    if (!value)
        value = 25;
    return num > 122 ? num - value : num + value;
}

function commonCore(e,ele) {
    var $this = $(e.target);
    if (e.type == 'mouseenter' || e.type == 'click') {
        $(".ripple").remove();
    }
    var posX = $this.offset().left,
        posY = $this.offset().top,
        buttonWidth = ele.width(),
        buttonHeight = ele.height();
    if (e.type == 'mouseenter' || e.type == 'click') {
        ele.append("<div class='ripple'></div>");
    }
    if (buttonWidth >= buttonHeight) {
        buttonHeight = buttonWidth;
    } else {
        buttonWidth = buttonHeight;
    }
    var x = e.pageX - posX - buttonWidth / 2;
    var y = e.pageY - posY - buttonHeight / 2;
    var className = '';
    if (e.type == 'mouseenter') {
        className = 'rippleEffect';
    } else if (e.type == 'mouseleave') {
        className = 'rippleRemove';
    } else if (e.type == 'click') {
        className = 'rippleClickEffect';
    }

    var _domColor = $(e.target).css("background-color"), _maskColor = "#f5f5f5";
    if (_domColor) {
        var regexp = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\)/;
        var re = _domColor.match(regexp);
        if (re) {
            var r = +re[1], g = +re[2], b = +re[3], a = +re[4], alpha = 1;
            r = calcColor(r);
            g = calcColor(g);
            b = calcColor(b);
            _maskColor = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
            /* if (a) {
             //alpha = a > 0.5 ? a - 0.25 : a + 0.25;
             _maskColor = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
             } else {
             _maskColor = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
             }*/
        }
    }
    ele.find(".ripple").css({
        width: buttonWidth,
        height: buttonHeight,
        top: y + 'px',
        left: x + 'px',
        backgroundColor: ele[0].attributes['data-shadecolor'] ? ele[0].attributes['data-shadecolor'].value :  _maskColor
    }).addClass(className);
}


});
