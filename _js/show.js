
//
//    $(window).on('keyup', function(ev) {
//      var kc = ev.keyCode;
//      var $sel = $('.thumbs > img.selected');
//      if (kc === 74 || kc === 40 || kc === 39) show($sel.next());
//      else if (kc === 75 || kc === 38 || kc === 37) show($sel.prev());
//      else if (kc === 72 || kc === 33) show($('.thumbs > img:first'));
//      else if (kc === 76 || kc === 34) show($('.thumbs > img:last'));
//    });
//

var TgShow = (function() {

  var self = this;

  //
  // protected

  //
  // public

  this.show = function($img) {

    if ($img.length < 1) return;

    $show = $img.closest('.show');

    var $ts = $show.find('.thumbs');
    var wh = $(window).height();
    var src = $img.prop('src');

    $show.css('height', '' + (wh - $('.header').height()) + 'px');
      // TODO: nuke, that, set 100% height via css!
    $show.css('background', 'url(' + src + ') no-repeat center center fixed');
    $show.css('background-position', '50% 70%');
    $show.css('background-size', 'auto 80%');

    $ts.find('img').removeClass('selected');
    $img.addClass('selected');
    var $i = $img.prev();
    if ($i.length < 1) $i = $img;

    $ts.css('top', '-' + $i[0].offsetTop + 'px');

    var $last = $ts.find('img:last');
    var bottom = $last.offset().top + $last.height();
    if (bottom < wh) {
      $ts.css('top', '-' + ($ts.height() - wh + $last.height() + 14) + 'px');
    }
  };

  this.initShow = function($show) {

    $show.append('<div class="thumbs"></div>');
    var $thumbs = $show.find('.thumbs');
    $show.find('img').each(function(i, e) {
      $thumbs.append('<img src="' + $(e).prop('src') + '" />');
    });
    TgShow.show($show.find('.thumbs > img:first'));

    $show.on('click', function(ev) {
      var $show = $(ev.target);
      if ( ! $show.hasClass('show')) return;
      var $sel = $('.thumbs > img.selected');
      var $w = $(window);
      var w2 = $w.width() / 2;
      var h10 = $w.height() / 10;
      if (ev.offsetY < h10)
        TgShow.show($show.find('.thumbs > img:first'));
      else if (ev.offsetY > h10 * 9)
        TgShow.show($show.find('.thumbs > img:last'));
      else if (ev.offsetX > w2)
        TgShow.show($sel.next());
      else
        TgShow.show($sel.prev());
    });
    $thumbs.find('img').on('click', function(ev) {
      TgShow.show($(ev.target));
    });
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

