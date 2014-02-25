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

  this.show = function($img, all) {

    if ($img.length < 1) return;

    $show = $img.closest('.show');
    if ( ! all && ! $show.is(':visible')) return;

    var $ts = $show.find('.thumbs');
    var wh = $(window).height();
    var src = $img.prop('src');
    var sot = $show.offset().top;

    $show.css('height', '' + (wh - sot - 70) + 'px');
      // set height to window height, why 70?

    $show.children('img').each(function(i, e) {
      if (e.src === src) $(e).css('display', 'block');
      else $(e).css('display', 'none');
    });

    $ts.find('img').removeClass('selected');
    $img.addClass('selected');
    var $i = $img.prev();
    if ($i.length < 1) $i = $img;

    $ts.css('top', '-' + $i[0].offsetTop + 'px');

    var $last = $ts.find('img:last');
    var bottom = $last.offset().top + $last.height();
    if (bottom < wh) {
      $ts.css('top', '-' + ($ts.height() - wh + sot + $last.height() - 45) + 'px');
    }

    var b = $show.attr('data-tg-bm');
    if (b && window.localStorage) {
      var h = $show.attr('data-tg-head');
      localStorage[h + '/' + b + '.show'] = $img.attr('src');
    }
  };

  this.initShow = function($show) {

    $show.append('<div class="thumbs"></div>');
    var $thumbs = $show.find('.thumbs');
    $show.find('img').each(function(i, e) {
      $thumbs.append('<img src="' + $(e).prop('src') + '" />');
    });

    $show.on('click', function(ev) {
      var $show = $(ev.target);
      if ( ! $show.hasClass('show')) return;
      var $sel = $show.find('.thumbs > img.selected');
      var w2 = $show.width() / 2;
      var h10 = $show.height() / 10;
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

    var b = $show.attr('data-tg-bm');
    if (b && window.localStorage) {
      var h = $show.attr('data-tg-head');
      var src = localStorage[h + '/' + b + '.show'];
      TgShow.show($thumbs.find('img[src="' + src + '"]'));
    }

    if ($thumbs.find('.selected').length < 1) {
      TgShow.show($thumbs.find('img:first'));
    }
  };

  this.init = function() {

    $('.show').each(function(i, e) {
      self.initShow($(e));
    });

    var go = function($sel, goal, all) {
      $sel.each(function(i, e) {
        var $s = $(e);
        var $g = null;
        if      (goal === 'next') $g = $s.next();
        else if (goal === 'prev') $g = $s.prev();
        else if (goal === 'first') $g = $s.closest('.thumbs').find('img:first');
        else if (goal === 'last') $g = $s.closest('.thumbs').find('img:last');
        TgShow.show($g, all);
      });
    };

    $(window).on('keyup', function(ev) {
      var kc = ev.keyCode;
      //console.log(kc);
      var $sel = $('.thumbs > img.selected');
      if      (kc === 74 || kc === 40) go($sel, 'next');
      else if (kc === 75 || kc === 38) go($sel, 'prev');
      else if (kc === 33) go($sel, 'first');
      else if (kc === 34) go($sel, 'last');
      else if (kc === 83) go($sel, 'first', true); // "s"tart and all: true
      // 37 left 39 right
    });
  };

  //
  // over.

  return this;

}).apply({});

