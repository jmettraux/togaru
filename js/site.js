
var Cart = (function() {

  var self = this;

  //
  // protected

  var choices = {
    l: { en: 'large', ja: 'ooki', format: '30cm x 20cm', price: 7500 },
    s: { en: 'small', ja: 'chiisai', format: '10cm x 7cm', price: 1500 }
  };

  var putInCart = function(ev) {

    var $target = $(ev.target);
    //console.log($target[0]);
    //console.log($target.attr('data-tg-format'));
  };

  var showChoice = function(ev) {

    var $target = $(ev.target);

    if ($target.hasClass('horizontally-flipped')) return;
    $target.addClass('horizontally-flipped');
    $target.removeAttr('title');
    var $parent = $target.parent();
    $parent.addClass('wide');
    $parent.css('margin-left', '-' + ($parent.outerWidth() / 2) + 'px');

    var data = $target.attr('data-tg-data');
    for (var i = data.length - 1; i >= 0; i--) {
      var c = choices[data[i]];
      if ( ! c) continue;
      var $format = $('<span class="purchase-format"></span>');
      $format.attr('title', 'click to add to the cart'); // TODO: japanese
      $target.after($format);
      $format.append('<i class="fa fa-picture-o"></i>');
      $format.append(c.en);
      $format.attr('data-tg-format', data[i]);
      $format.on('click', putInCart);
    }
  };

  var initSells = function() {

    $('img').each(function(i, img) {

      var m = img.src.match(/_(S)([a-zA-Z0-9]*)\.jpe?g$/i);

      if ( ! m) return;
      if (m[1] !== 'S') return;
      var $img = $(img);
      if ($img.closest('.slideshow')[0]) return;

      var data = m[2];
      //console.log("data:" + data);

      $img.before('<div class="sale"></div>');
      var $sale = $img.prev('.sale');
      $sale.append('<div class="sheet"></div>');
      $sale.append($img);
      var $sheet = $sale.find('.sheet');
      $sheet.css('left', '50%');
      $sheet.css('width', '' + $img.width() + 'px');
      $sheet.css('margin-left', '-' + ($img.width() / 2) + 'px');
      $sheet.append('<div class="controls"></div>');
      var $cs = $sheet.find('.controls');
      $cs.css('margin-left', '-' + ($cs.outerWidth() / 2) + 'px');
      $cs.append('<i class="fa fa-shopping-cart" />');

      var $cart = $cs.find('.fa-shopping-cart');
      $cart.attr('title', 'order a print of this picture'); // TODO: japanese
      $cart.attr('data-tg-data', data);

      $cart.on('click', showChoice);
    });
  };

  //
  // public

  this.init = function() {

    initSells();
  };

  //
  // over.

  return this;

}).apply({});

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
      try { localStorage[b + '.heads'] = $head.find('img').attr('src'); }
      catch (ex) {}
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
      try {
        var src = localStorage[b + '.heads'];
        TgHeads.selectHead($heads.find('img[src="' + src + '"]').closest('.head'));
      }
      catch (ex) {}
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

var TgMenu = (function() {

  var self = this;

  //
  // protected

  //
  // public

  this.init = function() {

    var cat = window.location.href.match(/\/en\/([^\.\/]+)/)[1];
    $('a.item[data-cat="' + cat + '"]').addClass('selected');

    $('.header > .left').on('click', function(ev) {
      window.location.href = '/en/index.html';
    });

    $('a[data-cat]').on('click', function(ev) {
      var $a = $(ev.target);
      var cat = $a.attr('data-cat');
      window.location.href = '/en/' + cat + '.html';
    });
  };

  //
  // over.

  return this;

}).apply({});

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

  var IMAGE_MAX_HEIGHT = 500;

  //
  // public

  this.zoom = function($sel) {

    if ($('.zoom').is(':visible')) {
      $('.zoom').remove();
      return;
    }

    if ($sel.length < 1) return;

    window.scrollTo(0, 0);
    var $sel = $sel.filter(':visible');
    var src = $sel.attr('src');
    $('body').append('<div class="zoom"><img src="' + src + '" /></div>');
    var $w = $(window);
    $('.zoom').css('width', $w.width() + 'px');
    $('.zoom').css('height', $w.height() + 'px');
    $('.zoom > img').on('click', function() { $('.zoom').remove(); });
  };

  this.show = function($img, all) {

    if ($img.length < 1) return;

    var $show = $img.closest('.show');
    if ( ! all && ! $show.is(':visible')) return;

    var $ts = $show.find('.thumbs');
    var wh = $(window).height();
    var src = $img.prop('src');
    var sot = $show.offset().top;
    var sh = wh - sot;
    var ih = sh > IMAGE_MAX_HEIGHT ? IMAGE_MAX_HEIGHT : sh;

    $show.css('height', '' + sh + 'px');
    //$show.children('img').css('height', '' + ih + 'px');
    $show.children('img').css({
      "height": '' + ih + 'px',
      "margin-top": '' + ((sh - ih) / 2) + 'px'
    });

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
      var setTop = function() {
        $ts.css('top', '-' + ($ts.height() - sh) + 'px');
      };
      //var wait = $ts.height() < sh ? 1400 : 0;
      //window.setTimeout(setTop, wait);
      setTop(); window.setTimeout(setTop, 1400);
    }

    var b = $show.attr('data-tg-bm') || $show.parent().attr('data-tg-bm');
    if (b && window.localStorage) {
      var h = $show.attr('data-tg-head');
      try { localStorage[h + '/' + b + '.show'] = $img.attr('src'); }
      catch (ex) {}
    }

    // display 'location'

    var $loc = $show.find('.location');
    var i = 1;
    $ts.children().each(function(j, e) {
      if ($(e).is('.selected')) i = j + 1;
    });
    $loc.text('' + i + '/' + $ts.children().length);
  };

  this.initShow = function($show) {

    $show.css('opacity', '0.0');

    $show.append('<div class="thumbs"></div>');
    var $thumbs = $show.find('.thumbs');
    $show.find('img').each(function(i, e) {
      $thumbs.append('<img src="' + $(e).prop('src') + '" />');
    });

    if ( ! $show.is('.text')) {
      $show.append('<div class="location">0/0</div>');
    }

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

    var b = $show.attr('data-tg-bm') || $show.parent().attr('data-tg-bm');
    if (b && window.localStorage) {
      try {
        var h = $show.attr('data-tg-head');
        var src = localStorage[h + '/' + b + '.show'];
        TgShow.show($thumbs.find('img[src="' + src + '"]'));
      }
      catch (ex) {}
    }

    if ($thumbs.find('.selected').length < 1) {
      TgShow.show($thumbs.find('img:first'));
    }

    $show.fadeTo(300, 1.0);
  };

  this.init = function() {

    var $show = $('.show');

    $show.each(function(i, e) {
      self.initShow($(e));
    });
    $show.children('img').on('click', function(ev) {
      self.zoom($(ev.target));
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
      else if (kc === 33) go($sel, 'first'); // pgup
      else if (kc === 34) go($sel, 'last'); // pgdown
      else if (kc === 83) go($sel, 'first', true); // "s"tart and all: true
      else if (kc === 32) self.zoom($sel); // space
      // 37 left 39 right
    });

    $('.zoomable').on('click', function(ev) { // first one: about image
      self.zoom($(ev.target));
    });
  };

  //
  // over.

  return this;

}).apply({});


var Tg = (function() {

  var self = this;

  //
  // protected

  var initSlideshows = function() {

    var $ss = $('div.slideshow');
    $ss.find('img:first').show();
    $ss.append('<div class="sheet"></div>');
    $ss.find('.sheet').append('<div class="controls"></div>');
    var $cs = $ss.find('.controls');
    $cs.append('<i class="fa fa-step-backward" />');
    $cs.append('<i class="fa fa-pause" />');
    $cs.append('<i class="fa fa-play" />');
    $cs.append('<i class="fa fa-step-forward" />');
    $cs.css('margin-left', '-' + ($cs.outerWidth() / 2) + 'px');

    $('.controls > .fa-play').hide();

    $('.controls > .fa-pause').on('click', function(ev) {
      var $show = $(ev.target).closest('.slideshow');
      $show.find('.fa-play').show();
      $show.find('.fa-pause').hide();
    });
    $('.controls > .fa-play').on('click', function(ev) {
      var $show = $(ev.target).closest('.slideshow');
      $show.find('.fa-play').hide();
      $show.find('.fa-pause').show();
    });

    $(
      '.controls > .fa-step-backward, .controls > .fa-step-forward'
    ).on('click', function(ev) {

      var $target = $(ev.target);
      var $show = $target.closest('.slideshow');

      if ($show.hasClass('sliding')) return;

      var $img = $show.find('img:visible');
      var $succ = null;
      if ($target.hasClass('fa-step-forward')) $succ = $img.next('img');
      else $succ = $img.prev('img');

      if ( ! $succ[0]) return;

      $img.hide();
      $succ.show();
    });

    window.setTimeout(self.nextSlide, 3 * 1000);
  };

  this.nextSlide = function() {

    $('div.slideshow').addClass('sliding');

    $('div.slideshow').find('img:visible').each(function(i, img) {
      var $img = $(img);
      var $show = $img.closest('.slideshow');
      if ($show.find('.fa-play').is(':visible')) {
         $show.removeClass('sliding'); return;
      }
      $img.fadeOut(1100, function() {
        var $next = $img.next('img');
        if ( ! $next[0]) $next = $img.parent().find('img:first');
        $next.fadeIn(700, function() { $show.removeClass('sliding'); });
      });
    });

    window.setTimeout(self.nextSlide, 5 * 1000);
  };

  //
  // public

  this.init = function() {

    initSlideshows();
  };

  //
  // over.

  return this;

}).apply({});

