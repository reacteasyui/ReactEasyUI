/**
 * Created by liyanfeng on 2017/1/4.
 */

$(function() {
    // FastClick
    FastClick.attach(document.body);

    // Sider 滚动条
    $('.sider').scrollbar();

    // 回到顶部
    (function() {
        let to_top = $('#to-top');
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                //console.log($(this).scrollTop());
                to_top.fadeIn(100);
            } else {
                to_top.fadeOut(100);
            }
        });
        to_top.on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 300);
            return false;
        });
    })();

    // 移动端 Sider 菜单切换
    (function() {
        let btn_toggle = $('.navbar-toggle'),
            collapse_menu = $('.navbar-collapse, .sider'),
            menu_link = $('.navbar-nav > li > a, .btn-hide, .navlist a');
        if (btn_toggle.is(':hidden')) {
            return;
        }
        btn_toggle.on('click', function() {
            collapse_menu.toggle();
        });
        menu_link.on('click', function() {
            collapse_menu.hide();
        });
        $(document).on('click', function(e) {
            if (! $( e.target ).closest('.navbar-toggle, .navbar-collapse, .sider').length) {
                collapse_menu.hide();
            }
        });
    })();
});