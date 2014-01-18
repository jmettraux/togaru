
var Tg = (function() {

  var self = this;

  this.initSlideshows = function() {

    var $ss = $('div.slideshow');
    $ss.find('img:first').show();
    var x = $ss.append('<div class="controls"><i class="fa fa-step-backward" /><i class="fa fa-pause" /><i class="fa fa-play" /><i class="fa fa-step-forward" /></div>');

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
    $('.controls > .fa-step-backward').on('click', function(ev) {
      var $show = $(ev.target).closest('.slideshow');
      var $img = $show.find('img:visible');
      var $prev = $img.prev('img');
      if ( ! $prev[0]) return;
      $img.hide();
      $prev.show();
    });
    $('.controls > .fa-step-forward').on('click', function(ev) {
      var $show = $(ev.target).closest('.slideshow');
      var $img = $show.find('img:visible');
      var $next = $img.next('img');
      if ( ! $next[0]) return;
      $img.hide();
      $next.show();
    });

    window.setTimeout(self.nextSlide, 3 * 1000);
  };

  this.nextSlide = function() {

    $('div.slideshow').find('img:visible').each(function(i, img) {
      var $img = $(img);
      if ($img.closest('.slideshow').find('.fa-play').is(':visible')) return;
      $img.fadeOut(1100, function() {
        var $next = $img.next('img');
        if ( ! $next[0]) $next = $img.parent().find('img:first');
        $next.fadeIn(700);
      });
    });

    window.setTimeout(self.nextSlide, 5 * 1000);
  };

  this.init = function() {

    self.initSlideshows();
  };

  //
  // over.

  return this;

}).apply({});

