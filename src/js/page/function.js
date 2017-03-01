/**
 * Created by liyanfeng on 2017/1/4.
 */
(function($) {
    // FastClick
    FastClick.attach(document.body);

    // 回到顶部
    (function() {
        let to_top = $('#to-top');
        $(window).on('scroll', function(){
            if ($(this).scrollTop() > 100) {
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

    // 菜单切换
    $.handleMenuToggle = function() {
        function toggleMenu() {
            let btn_menu = $('.btn-menu'),
                menu = $('.nav, .sider'),
                menu_link = $('.navlist > li > a, .btn-hide, .toggle-list a');
            btn_menu.off('click');
            menu_link.off('click');
            $(document).off('click');
            if (btn_menu.is(':hidden')) {
                menu.show();
                return;
            }
            menu.hide();
            btn_menu.on('click', function() {
                menu.toggle();
            });
            menu_link.on('click', function() {
                menu.hide();
            });
            $(document).on('click', function(e) {
                if (! $(e.target).closest('.btn-menu, .nav, .sider').length) {
                    menu.hide();
                }
            });
        }
        toggleMenu();
        $(window).on('resize', function() {
            toggleMenu();
        });
    }
})(jQuery);