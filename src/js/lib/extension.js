/**
 * Created by shiyang on 2016/5/26.
 */
$(function () {
    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            var _this = $(this);
            if ($.browser.msie && $.browser.version < 10) {
                if (callback)
                    callback(_this);
                return;
            }
            _this.addClass('animated ' + animationName).one(animationEnd, function () {
                _this.removeClass('animated ' + animationName);
                if (callback)
                    callback(_this);
            });
        }
    });
});