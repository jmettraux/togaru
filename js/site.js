var TgShow=function(){var k=this;this.show=function(b){if(!(1>b.length)&&($show=b.closest(".show"),$show.is(":visible"))){var a=$show.find(".thumbs"),c=$(window).height(),h=b.prop("src");$show.css("height",""+(c-$(".header").height()-70)+"px");$show.children("img").each(function(c,a){a.src===h?$(a).css("display","block"):$(a).css("display","none")});a.find("img").removeClass("selected");b.addClass("selected");var g=b.prev();1>g.length&&(g=b);a.css("top","-"+g[0].offsetTop+"px");b=a.find("img:last");
b.offset().top+b.height()<c&&a.css("top","-"+(a.height()-c+b.height()+14)+"px")}};this.initShow=function(b){b.append('<div class="thumbs"></div>');var a=b.find(".thumbs");b.find("img").each(function(c,h){a.append('<img src="'+$(h).prop("src")+'" />')});TgShow.show(b.find(".thumbs > img:first"));b.on("click",function(c){var a=$(c.target);if(a.hasClass("show")){var g=a.find(".thumbs > img.selected"),b=a.width()/2,d=a.height()/10;c.offsetY<d?TgShow.show(a.find(".thumbs > img:first")):c.offsetY>9*d?TgShow.show(a.find(".thumbs > img:last")):
c.offsetX>b?TgShow.show(g.next()):TgShow.show(g.prev())}});a.find("img").on("click",function(a){TgShow.show($(a.target))})};this.init=function(){$(".show").each(function(a,c){k.initShow($(c))});var b=function(a,c){a.each(function(a,b){var f=$(b),d=null;"next"===c?d=f.next():"prev"===c?d=f.prev():"first"===c?d=f.closest(".thumbs").find("img:first"):"last"===c&&(d=f.closest(".thumbs").find("img:last"));TgShow.show(d)})};$(window).on("keyup",function(a){a=a.keyCode;var c=$(".thumbs > img.selected");
74===a||40===a?b(c,"next"):75===a||38===a?b(c,"prev"):72===a||33===a?b(c,"first"):76!==a&&34!==a||b(c,"last")})};return this}.apply({});var Cart=function(){var k={l:{en:"large",ja:"ooki",format:"30cm x 20cm",price:7500},s:{en:"small",ja:"chiisai",format:"10cm x 7cm",price:1500}},b=function(a){$(a.target)},a=function(a){a=$(a.target);if(!a.hasClass("horizontally-flipped")){a.addClass("horizontally-flipped");a.removeAttr("title");var c=a.parent();c.addClass("wide");c.css("margin-left","-"+c.outerWidth()/2+"px");for(var c=a.attr("data-tg-data"),f=c.length-1;0<=f;f--){var d=k[c[f]];if(d){var e=$('<span class="purchase-format"></span>');
e.attr("title","click to add to the cart");a.after(e);e.append('<i class="fa fa-picture-o"></i>');e.append(d.en);e.attr("data-tg-format",c[f]);e.on("click",b)}}}},c=function(){$("img").each(function(c,b){var f=b.src.match(/_(S)([a-zA-Z0-9]*)\.jpe?g$/i);if(f&&"S"===f[1]){var d=$(b);if(!d.closest(".slideshow")[0]){f=f[2];d.before('<div class="sale"></div>');var e=d.prev(".sale");e.append('<div class="sheet"></div>');e.append(d);e=e.find(".sheet");e.css("left","50%");e.css("width",""+d.width()+"px");
e.css("margin-left","-"+d.width()/2+"px");e.append('<div class="controls"></div>');d=e.find(".controls");d.css("margin-left","-"+d.outerWidth()/2+"px");d.append('<i class="fa fa-shopping-cart" />');d=d.find(".fa-shopping-cart");d.attr("title","order a print of this picture");d.attr("data-tg-data",f);d.on("click",a)}}})};this.init=function(){c()};return this}.apply({});var Tg=function(){var k=this,b=function(){var a=$("div.slideshow");a.find("img:first").show();a.append('<div class="sheet"></div>');a.find(".sheet").append('<div class="controls"></div>');a=a.find(".controls");a.append('<i class="fa fa-step-backward" />');a.append('<i class="fa fa-pause" />');a.append('<i class="fa fa-play" />');a.append('<i class="fa fa-step-forward" />');a.css("margin-left","-"+a.outerWidth()/2+"px");$(".controls > .fa-play").hide();$(".controls > .fa-pause").on("click",function(a){a=
$(a.target).closest(".slideshow");a.find(".fa-play").show();a.find(".fa-pause").hide()});$(".controls > .fa-play").on("click",function(a){a=$(a.target).closest(".slideshow");a.find(".fa-play").hide();a.find(".fa-pause").show()});$(".controls > .fa-step-backward, .controls > .fa-step-forward").on("click",function(a){a=$(a.target);var b=a.closest(".slideshow");if(!b.hasClass("sliding")){var b=b.find("img:visible"),g=null,g=a.hasClass("fa-step-forward")?b.next("img"):b.prev("img");g[0]&&(b.hide(),g.show())}});
window.setTimeout(k.nextSlide,3E3)};this.nextSlide=function(){$("div.slideshow").addClass("sliding");$("div.slideshow").find("img:visible").each(function(a,b){var h=$(b),g=h.closest(".slideshow");g.find(".fa-play").is(":visible")?g.removeClass("sliding"):h.fadeOut(1100,function(){var a=h.next("img");a[0]||(a=h.parent().find("img:first"));a.fadeIn(700,function(){g.removeClass("sliding")})})});window.setTimeout(k.nextSlide,5E3)};this.init=function(){b()};return this}.apply({});
