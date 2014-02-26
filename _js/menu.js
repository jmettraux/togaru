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

