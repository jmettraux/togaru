/*
 * Copyright (c) 2013-2014, John Mettraux, jmettraux@gmail.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Made in Japan.
 */

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

    var go = function($sel, goal) {
      $sel.each(function(i, e) {
        var $s = $(e);
        var $g = null;
        if      (goal === 'next') $g = $s.next();
        else if (goal === 'prev') $g = $s.prev();
        else if (goal === 'first') $g = $s.closest('.thumbs').find('img:first');
        else if (goal === 'last') $g = $s.closest('.thumbs').find('img:last');
        TgShow.show($g);
      });
    };

    $(window).on('keyup', function(ev) {
      var kc = ev.keyCode;
      //console.log(kc);
      var $sel = $('.thumbs > img.selected');
      if      (kc === 74 || kc === 40) go($sel, 'next');
      else if (kc === 75 || kc === 38) go($sel, 'prev');
      else if (kc === 72 || kc === 33) go($sel, 'first');
      else if (kc === 76 || kc === 34) go($sel, 'last');
      // 37 left 39 right
    });
  };

  //
  // over.

  return this;

}).apply({});

