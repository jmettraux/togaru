
var Cart = (function() {

  var self = this;

  //
  // protected

  var initSells = function() {

    $('img').each(function(i, img) {

      var m = img.src.match(/_(S)([a-zA-Z0-9]*)\.jpe?g$/i);

      if ( ! m) return;
      if (m[1] !== 'S') return;
      if ($(img).closest('.slideshow')[0]) return;

      var data = m[2];
      //console.log("data:" + data);
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

