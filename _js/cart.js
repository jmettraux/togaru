
var Cart = (function() {

  var self = this;

  //
  // protected

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
      $sheet.css('width', '' + $img.width() + 'px');
      $sheet.css('margin-left', '-' + ($img.width() / 2) + 'px');
      $sheet.append('<div class="controls"></div>');
      var $cs = $sheet.find('.controls');
      $cs.append('<i class="fa fa-shopping-cart" />');

      $cs.find('.fa-shopping-cart').attr(
        'title', 'order a print of this picture'); // TODO: japanese

      // TODO: action handler
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

