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

var TgHeads = (function() {

  var self = this;

  //
  // protected

  //
  // public

  this.selectHead = function($head) {

    if ($head.length < 1) return;

    var $heads = $head.closest('.heads');
    var $slide = $head.closest('.head-slide');

    $slide.find('.head').removeClass('selected');
    $head.addClass('selected');
    var h = $head.attr('data-tg-head');
    $('.show[data-tg-head]').hide();
    var $show = $('.show[data-tg-head="' + h + '"]');
    $show.show();
    $show.find('img.selected').click();

    $slide.css('left', '0px');
    var hw = $heads.width();
    var ol = $head.offset().left;
    var w = $head.width();
    $slide.css('left', (hw / 2 - ol - w / 2) + 'px');

    var b = $heads.attr('data-tg-bm');
    if (b && window.localStorage) {
      localStorage[b + '.heads'] = $head.find('img').attr('src');
    }
  };

  this.initHeads = function($heads) {

    $heads.css('opacity', '0.0');

    $heads.append('<div class="head-slide"></div>');
    $slide = $heads.find('.head-slide');
    $heads.find('.head').each(function(i, e) { $slide.append(e); });

    $heads.find('.head').on('click', function(ev) {
      TgHeads.selectHead($(ev.target).closest('.head'));
    });

    var b = $heads.attr('data-tg-bm');
    if (b && window.localStorage) {
      var src = localStorage[b + '.heads'];
      TgHeads.selectHead($heads.find('img[src="' + src + '"]').closest('.head'));
    }

    if ($heads.find('.head.selected').length < 1) {
      TgHeads.selectHead($heads.find('.head:first'));
    }

    $heads.fadeTo(200, 1.0);
  };

  this.init = function() {

    $('.show[data-tg-head]').hide();
    $('div.heads').each(function(i, e) { TgHeads.initHeads($(e)); });

    var goStart = function() {
      $('div.heads').each(function(i, e) {
        TgHeads.selectHead($(e).find('.head:first'));
      });
    };

    $(window).on('keyup', function(ev) {
      var kc = ev.keyCode;
      var $sel = $('.head.selected');
      if      (kc === 37 || kc === 72) TgHeads.selectHead($sel.prev());
      else if (kc === 39 || kc === 76) TgHeads.selectHead($sel.next());
      else if (kc === 83) goStart();
    });
  };

  //
  // over.

  return this;

}).apply({});

