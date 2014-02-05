
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
    $target.parent().addClass('wide');

    var data = $target.attr('data-tg-data');
    for (var i = 0, l = data.length; i < l; i++) {
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

