$(function() {
  $("body").on('mouseenter mouseleave', '.hover-btn', function(e) {
      var $this = $(this);
      if (e.type == 'mouseenter') {
          $(".ripple").remove();
      }
      var posX = $this.offset().left,
          posY = $this.offset().top,
          buttonWidth = $this.width(),
          buttonHeight = $this.height();
      if (e.type == 'mouseenter') {
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
      }
      $this.find(".ripple").css({
          width: buttonWidth,
          height: buttonHeight,
          top: y + 'px',
          left: x + 'px',
          backgroundColor:e.target.getAttribute('data-shadecolor')
      }).addClass(className);
  });
  $("body").on('click', '.click-btn', function(e) {
      var $this = $(this);
      $(".ripple").remove();
      var posX = $this.offset().left,
          posY = $this.offset().top,
          buttonWidth = $this.width(),
          buttonHeight = $this.height();
      $this.append("<div class='ripple'></div>");
      if (buttonWidth >= buttonHeight) {
          buttonHeight = buttonWidth;
      } else {
          buttonWidth = buttonHeight;
      }
      var x = e.pageX - posX - buttonWidth / 2;
      var y = e.pageY - posY - buttonHeight / 2;
      $this.find(".ripple").css({
          width: buttonWidth,
          height: buttonHeight,
          top: y + 'px',
          left: x + 'px',
          background:e.target.getAttribute('data-shadecolor')
      }).addClass("rippleClickEffect");
  })  


  /*shape-circle-shape effects*/
  $("body").on('click','.shape-circle-click',function(){
    $(this).addClass('shape-circle-click-effect');
    delayTime(800);
  });
  $("body").on('click','.shape-square',function(e){
    $(".pulse").remove();
    $(this).append('<div class="pulse"></div>');
    var buttonWidth = $(this).width(),
         buttonHeight = $(this).height();
    $(this).find('.pulse').css({
      width: buttonWidth,
      height: buttonHeight,
      background:e.currentTarget.getAttribute('data-shadecolor')
    });

  });
});

function delayTime(t){
  setTimeout(function(){$('.shape-circle-click').removeClass('shape-circle-click-effect')},t);
}