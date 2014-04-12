var TgMenu=function(){this.init=function(){var b=window.location.href.match(/\/en\/([^\.\/]+)/)[1];$('a.item[data-cat="'+b+'"]').addClass("selected");$(".header > .left").on("click",function(b){window.location.href="/en/index.html"});$("a[data-cat]").on("click",function(b){b=$(b.target).attr("data-cat");window.location.href="/en/"+b+".html"})};return this}.apply({});var TgHeads=function(){this.selectHead=function(b){if(!(1>b.length)){var c=b.closest(".heads"),a=b.closest(".head-slide");a.find(".head").removeClass("selected");b.addClass("selected");var d=b.attr("data-tg-head");$(".show[data-tg-head]").hide();d=$('.show[data-tg-head="'+d+'"]');d.show();d.find("img.selected").click();a.css("left","0px");var d=c.width(),f=b.offset().left,g=b.width();a.css("left",d/2-f-g/2+"px");(c=c.attr("data-tg-bm"))&&window.localStorage&&(localStorage[c+".heads"]=b.find("img").attr("src"))}};
this.initHeads=function(b){b.css("opacity","0.0");b.append('<div class="head-slide"></div>');$slide=b.find(".head-slide");b.find(".head").each(function(a,d){$slide.append(d)});b.find(".head").on("click",function(a){TgHeads.selectHead($(a.target).closest(".head"))});var c=b.attr("data-tg-bm");c&&window.localStorage&&TgHeads.selectHead(b.find('img[src="'+localStorage[c+".heads"]+'"]').closest(".head"));1>b.find(".head.selected").length&&TgHeads.selectHead(b.find(".head:first"));b.fadeTo(200,1)};this.init=
function(){$(".show[data-tg-head]").hide();$("div.heads").each(function(b,a){TgHeads.initHeads($(a))});var b=function(){$("div.heads").each(function(b,a){TgHeads.selectHead($(a).find(".head:first"))})};$(window).on("keyup",function(c){c=c.keyCode;var a=$(".head.selected");37===c||72===c?TgHeads.selectHead(a.prev()):39===c||76===c?TgHeads.selectHead(a.next()):83===c&&b()})};return this}.apply({});var TgShow=function(){var b=this,c=function(a){$(".zoom").is(":visible")?$(".zoom").remove():(a=a.filter(":visible"),a=a.attr("src"),$("body").append('<div class="zoom"><img src="'+a+'" /></div>'),a=$(window),$(".zoom").css("width",a.width()+"px"),$(".zoom").css("height",a.height()+"px"),$(".zoom > img").on("click",function(){$(".zoom").remove()}))};this.show=function(a,d){if(!(1>a.length)&&($show=a.closest(".show"),d||$show.is(":visible"))){var f=$show.find(".thumbs"),g=$(window).height(),b=a.prop("src"),
e=$show.offset().top,h=g-e;$show.css("height",""+h+"px");$show.children("img").each(function(a,f){f.src===b?$(f).css("display","block"):$(f).css("display","none")});f.find("img").removeClass("selected");a.addClass("selected");e=a.prev();1>e.length&&(e=a);f.css("top","-"+e[0].offsetTop+"px");e=f.find("img:last");e.offset().top+e.height()<g&&(g=function(){f.css("top","-"+(f.height()-h)+"px")},g(),window.setTimeout(g,1400));(g=$show.attr("data-tg-bm")||$show.parent().attr("data-tg-bm"))&&window.localStorage&&
(e=$show.attr("data-tg-head"),localStorage[e+"/"+g+".show"]=a.attr("src"))}};this.initShow=function(a){a.css("opacity","0.0");a.append('<div class="thumbs"></div>');var d=a.find(".thumbs");a.find("img").each(function(a,f){d.append('<img src="'+$(f).prop("src")+'" />')});a.on("click",function(a){var f=$(a.target);if(f.hasClass("show")){var g=f.find(".thumbs > img.selected"),d=f.width()/2,b=f.height()/10;a.offsetY<b?TgShow.show(f.find(".thumbs > img:first")):a.offsetY>9*b?TgShow.show(f.find(".thumbs > img:last")):
a.offsetX>d?TgShow.show(g.next()):TgShow.show(g.prev())}});d.find("img").on("click",function(a){TgShow.show($(a.target))});var f=a.attr("data-tg-bm")||a.parent().attr("data-tg-bm");if(f&&window.localStorage){var g=a.attr("data-tg-head");TgShow.show(d.find('img[src="'+localStorage[g+"/"+f+".show"]+'"]'))}1>d.find(".selected").length&&TgShow.show(d.find("img:first"));a.fadeTo(300,1)};this.init=function(){var a=$(".show");a.each(function(a,g){b.initShow($(g))});a.children("img").on("click",function(a){c($(a.target))});
var d=function(a,g,d){a.each(function(a,f){var b=$(f),c=null;"next"===g?c=b.next():"prev"===g?c=b.prev():"first"===g?c=b.closest(".thumbs").find("img:first"):"last"===g&&(c=b.closest(".thumbs").find("img:last"));TgShow.show(c,d)})};$(window).on("keyup",function(a){a=a.keyCode;var b=$(".thumbs > img.selected");74===a||40===a?d(b,"next"):75===a||38===a?d(b,"prev"):33===a?d(b,"first"):34===a?d(b,"last"):83===a?d(b,"first",!0):32===a&&c(b)})};return this}.apply({});var Cart=function(){var b={l:{en:"large",ja:"ooki",format:"30cm x 20cm",price:7500},s:{en:"small",ja:"chiisai",format:"10cm x 7cm",price:1500}},c=function(a){$(a.target)},a=function(a){a=$(a.target);if(!a.hasClass("horizontally-flipped")){a.addClass("horizontally-flipped");a.removeAttr("title");var d=a.parent();d.addClass("wide");d.css("margin-left","-"+d.outerWidth()/2+"px");for(var d=a.attr("data-tg-data"),k=d.length-1;0<=k;k--){var e=b[d[k]];if(e){var h=$('<span class="purchase-format"></span>');
h.attr("title","click to add to the cart");a.after(h);h.append('<i class="fa fa-picture-o"></i>');h.append(e.en);h.attr("data-tg-format",d[k]);h.on("click",c)}}}},d=function(){$("img").each(function(b,d){var c=d.src.match(/_(S)([a-zA-Z0-9]*)\.jpe?g$/i);if(c&&"S"===c[1]){var e=$(d);if(!e.closest(".slideshow")[0]){c=c[2];e.before('<div class="sale"></div>');var h=e.prev(".sale");h.append('<div class="sheet"></div>');h.append(e);h=h.find(".sheet");h.css("left","50%");h.css("width",""+e.width()+"px");
h.css("margin-left","-"+e.width()/2+"px");h.append('<div class="controls"></div>');e=h.find(".controls");e.css("margin-left","-"+e.outerWidth()/2+"px");e.append('<i class="fa fa-shopping-cart" />');e=e.find(".fa-shopping-cart");e.attr("title","order a print of this picture");e.attr("data-tg-data",c);e.on("click",a)}}})};this.init=function(){d()};return this}.apply({});var Tg=function(){var b=this,c=function(){var a=$("div.slideshow");a.find("img:first").show();a.append('<div class="sheet"></div>');a.find(".sheet").append('<div class="controls"></div>');a=a.find(".controls");a.append('<i class="fa fa-step-backward" />');a.append('<i class="fa fa-pause" />');a.append('<i class="fa fa-play" />');a.append('<i class="fa fa-step-forward" />');a.css("margin-left","-"+a.outerWidth()/2+"px");$(".controls > .fa-play").hide();$(".controls > .fa-pause").on("click",function(a){a=
$(a.target).closest(".slideshow");a.find(".fa-play").show();a.find(".fa-pause").hide()});$(".controls > .fa-play").on("click",function(a){a=$(a.target).closest(".slideshow");a.find(".fa-play").hide();a.find(".fa-pause").show()});$(".controls > .fa-step-backward, .controls > .fa-step-forward").on("click",function(a){a=$(a.target);var b=a.closest(".slideshow");if(!b.hasClass("sliding")){var b=b.find("img:visible"),c=null,c=a.hasClass("fa-step-forward")?b.next("img"):b.prev("img");c[0]&&(b.hide(),c.show())}});
window.setTimeout(b.nextSlide,3E3)};this.nextSlide=function(){$("div.slideshow").addClass("sliding");$("div.slideshow").find("img:visible").each(function(a,b){var c=$(b),g=c.closest(".slideshow");g.find(".fa-play").is(":visible")?g.removeClass("sliding"):c.fadeOut(1100,function(){var a=c.next("img");a[0]||(a=c.parent().find("img:first"));a.fadeIn(700,function(){g.removeClass("sliding")})})});window.setTimeout(b.nextSlide,5E3)};this.init=function(){c()};return this}.apply({});
