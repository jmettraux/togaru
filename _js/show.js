//
//  $(document).ready(function() {
//
//    // TODO: package that in a library
//
//    var $show = $('.show');
//    var $window = $(window);
//
//    $show.append('<div class="thumbs"></div>');
//    $thumbs = $show.find('.thumbs');
//    $show.find('img').each(function(i, e) {
//      var src = $(e).prop('src');
//      $thumbs.append('<img src="' + src + '" />');
//    });
//
//    var show = function($img, mouseover) {
//
//      if ($img.length < 1) return;
//
//      var src = $img.prop('src');
//      $show.css('height', '' + ($window.height() - $('.header').height()) + 'px'); // TODO: nuke, that, set 100% height via css!
//      $show.css('background', 'url(' + src + ') no-repeat center center fixed');
//      $show.css('background-position', '50% 70%');
//      $show.css('background-size', 'auto 80%');
//
//      $thumbs.find('img').removeClass('selected');
//      $img.addClass('selected');
//      var $i = $img.prev();
//      if ($i.length < 1) $i = $img;
//
//      if (mouseover) return;
//
//      $thumbs.css('top', '-' + $i[0].offsetTop + 'px');
//
//      var $last = $thumbs.find('img:last');
//      var wh = $window.height();
//      var bottom = $last.offset().top + $last.height();
//      if (bottom < wh) {
//        $thumbs.css('top', '-' + ($thumbs.height() - wh + $last.height() + 14) + 'px');
//      }
//    };
//    show($('.thumbs > img:first'));
//
//    $(window).on('keyup', function(ev) {
//      var kc = ev.keyCode;
//      var $sel = $('.thumbs > img.selected');
//      if (kc === 74 || kc === 40 || kc === 39) show($sel.next());
//      else if (kc === 75 || kc === 38 || kc === 37) show($sel.prev());
//      else if (kc === 72 || kc === 33) show($('.thumbs > img:first'));
//      else if (kc === 76 || kc === 34) show($('.thumbs > img:last'));
//    });
//    //$thumbs.find('img').on('mouseover', function(ev) {
//    //  show($(ev.target), true);
//    //});
//    $thumbs.find('img').on('click', function(ev) {
//      show($(ev.target), false);
//    });
//    $show.on('click', function(ev) {
//      if ( ! $(ev.target).hasClass('show')) return;
//      var $sel = $('.thumbs > img.selected');
//      var w2 = $(window).width() / 2;
//      var h10 = $(window).height() / 10;
//      if (ev.offsetY < h10) show($('.thumbs > img:first'));
//      else if (ev.offsetY > h10 * 9) show($('.thumbs > img:last'));
//      else if (ev.offsetX > w2) show($sel.next());
//      else show($sel.prev());
//    });
//  });
//

var TgShow = (function() {

  var self = this;

  //
  // protected

  //
  // public

  this.initShow = function($show) {
    console.log($show);
  };

  this.init = function() {

    $('.show').each(function(i, e) {
      self.initShow($(e));
    });
  };

  //
  // over.

  return this;

}).apply({});

