$(function () {
    $(document).on('mouseenter mouseleave', '.hover-btn', function (e) {
        commonCore(e);
    }).on('click', '.click-btn', function (e) {
        commonCore(e);
    }).on('click', '.shape-circle-click', function () {/*shape-circle-shape effects*/
        $(this).addClass('shape-circle-click-effect');
        delayTime(800);
    }).on('click', '.shape-square', function (e) {
        $(".pulse").remove();
        $(this).append('<div class="pulse"></div>');
        var buttonWidth = $(this).width(),
            buttonHeight = $(this).height();
        $(this).find('.pulse').css({
            width: buttonWidth,
            height: buttonHeight,
            background: e.currentTarget.getAttribute('data-shadecolor')
        });
    });

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

    function commonCore(e) {
        var $this = $(e.target);
        if (e.type == 'mouseenter' || e.type == 'click') {
            $(".ripple").remove();
        }
        var posX = $this.offset().left,
            posY = $this.offset().top,
            buttonWidth = $this.width(),
            buttonHeight = $this.height();
        if (e.type == 'mouseenter' || e.type == 'click') {
            $this.append("<div class='ripple'></div>");
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
        $this.find(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px',
            backgroundColor: e.target.getAttribute('data-shadecolor') || _maskColor
        }).addClass(className);
    }
});

