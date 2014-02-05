
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

