var TgMenu=function(){this.init=function(){var c=window.location.href.match(/\/en\/([^\.\/]+)/)[1];$('a.item[data-cat="'+c+'"]').addClass("selected");$(".header > .left").on("click",function(a){window.location.href="/en/index.html"});$("a[data-cat]").on("click",function(a){a=$(a.target).attr("data-cat");window.location.href="/en/"+a+".html"})};return this}.apply({});var TgHeads=function(){this.selectHead=function(c){if(!(1>c.length)){var a=c.closest(".heads"),d=c.closest(".head-slide");d.find(".head").removeClass("selected");c.addClass("selected");var b=c.attr("data-tg-head");$(".show[data-tg-head]").hide();b=$('.show[data-tg-head="'+b+'"]');b.show();b.find("img.selected").click();d.css("left","0px");var b=a.width(),g=c.offset().left,h=c.width();d.css("left",b/2-g-h/2+"px");(a=a.attr("data-tg-bm"))&&window.localStorage&&(localStorage[a+".heads"]=c.find("img").attr("src"))}};
this.initHeads=function(c){c.append('<div class="head-slide"></div>');$slide=c.find(".head-slide");c.find(".head").each(function(a,b){$slide.append(b)});c.find(".head").on("click",function(a){TgHeads.selectHead($(a.target).closest(".head"))});var a=c.attr("data-tg-bm");a&&window.localStorage&&TgHeads.selectHead(c.find('img[src="'+localStorage[a+".heads"]+'"]').closest(".head"));1>c.find(".head.selected").length&&TgHeads.selectHead(c.find(".head:first"))};this.init=function(){$(".show[data-tg-head]").hide();
$("div.heads").each(function(a,d){TgHeads.initHeads($(d))});var c=function(){$("div.heads").each(function(a,d){TgHeads.selectHead($(d).find(".head:first"))})};$(window).on("keyup",function(a){a=a.keyCode;var d=$(".head.selected");37===a||72===a?TgHeads.selectHead(d.prev()):39===a||76===a?TgHeads.selectHead(d.next()):83===a&&c()})};return this}.apply({});var TgShow=function(){var c=this;this.show=function(a,d){if(!(1>a.length)&&($show=a.closest(".show"),d||$show.is(":visible"))){var b=$show.find(".thumbs"),g=$(window).height(),h=a.prop("src"),c=$show.offset().top;$show.css("height",""+(g-c-70)+"px");$show.children("img").each(function(a,b){b.src===h?$(b).css("display","block"):$(b).css("display","none")});b.find("img").removeClass("selected");a.addClass("selected");var e=a.prev();1>e.length&&(e=a);b.css("top","-"+e[0].offsetTop+"px");e=b.find("img:last");
e.offset().top+e.height()<g&&b.css("top","-"+(b.height()-g+c+e.height()-45)+"px");(b=$show.attr("data-tg-bm")||$show.parent().attr("data-tg-bm"))&&window.localStorage&&(g=$show.attr("data-tg-head"),localStorage[g+"/"+b+".show"]=a.attr("src"))}};this.initShow=function(a){a.append('<div class="thumbs"></div>');var d=a.find(".thumbs");a.find("img").each(function(b,a){d.append('<img src="'+$(a).prop("src")+'" />')});a.on("click",function(a){var b=$(a.target);if(b.hasClass("show")){var d=b.find(".thumbs > img.selected"),
e=b.width()/2,c=b.height()/10;a.offsetY<c?TgShow.show(b.find(".thumbs > img:first")):a.offsetY>9*c?TgShow.show(b.find(".thumbs > img:last")):a.offsetX>e?TgShow.show(d.next()):TgShow.show(d.prev())}});d.find("img").on("click",function(b){TgShow.show($(b.target))});var b=a.attr("data-tg-bm")||a.parent().attr("data-tg-bm");b&&window.localStorage&&(a=a.attr("data-tg-head"),TgShow.show(d.find('img[src="'+localStorage[a+"/"+b+".show"]+'"]')));1>d.find(".selected").length&&TgShow.show(d.find("img:first"))};
this.init=function(){$(".show").each(function(a,b){c.initShow($(b))});var a=function(a,b,c){a.each(function(a,d){var e=$(d),f=null;"next"===b?f=e.next():"prev"===b?f=e.prev():"first"===b?f=e.closest(".thumbs").find("img:first"):"last"===b&&(f=e.closest(".thumbs").find("img:last"));TgShow.show(f,c)})};$(window).on("keyup",function(d){d=d.keyCode;var b=$(".thumbs > img.selected");74===d||40===d?a(b,"next"):75===d||38===d?a(b,"prev"):33===d?a(b,"first"):34===d?a(b,"last"):83===d&&a(b,"first",!0)})};
return this}.apply({});var Cart=function(){var c={l:{en:"large",ja:"ooki",format:"30cm x 20cm",price:7500},s:{en:"small",ja:"chiisai",format:"10cm x 7cm",price:1500}},a=function(a){$(a.target)},d=function(b){b=$(b.target);if(!b.hasClass("horizontally-flipped")){b.addClass("horizontally-flipped");b.removeAttr("title");var d=b.parent();d.addClass("wide");d.css("margin-left","-"+d.outerWidth()/2+"px");for(var d=b.attr("data-tg-data"),k=d.length-1;0<=k;k--){var e=c[d[k]];if(e){var f=$('<span class="purchase-format"></span>');
f.attr("title","click to add to the cart");b.after(f);f.append('<i class="fa fa-picture-o"></i>');f.append(e.en);f.attr("data-tg-format",d[k]);f.on("click",a)}}}},b=function(){$("img").each(function(b,a){var c=a.src.match(/_(S)([a-zA-Z0-9]*)\.jpe?g$/i);if(c&&"S"===c[1]){var e=$(a);if(!e.closest(".slideshow")[0]){c=c[2];e.before('<div class="sale"></div>');var f=e.prev(".sale");f.append('<div class="sheet"></div>');f.append(e);f=f.find(".sheet");f.css("left","50%");f.css("width",""+e.width()+"px");
f.css("margin-left","-"+e.width()/2+"px");f.append('<div class="controls"></div>');e=f.find(".controls");e.css("margin-left","-"+e.outerWidth()/2+"px");e.append('<i class="fa fa-shopping-cart" />');e=e.find(".fa-shopping-cart");e.attr("title","order a print of this picture");e.attr("data-tg-data",c);e.on("click",d)}}})};this.init=function(){b()};return this}.apply({});var Tg=function(){var c=this,a=function(){var a=$("div.slideshow");a.find("img:first").show();a.append('<div class="sheet"></div>');a.find(".sheet").append('<div class="controls"></div>');a=a.find(".controls");a.append('<i class="fa fa-step-backward" />');a.append('<i class="fa fa-pause" />');a.append('<i class="fa fa-play" />');a.append('<i class="fa fa-step-forward" />');a.css("margin-left","-"+a.outerWidth()/2+"px");$(".controls > .fa-play").hide();$(".controls > .fa-pause").on("click",function(a){a=
$(a.target).closest(".slideshow");a.find(".fa-play").show();a.find(".fa-pause").hide()});$(".controls > .fa-play").on("click",function(a){a=$(a.target).closest(".slideshow");a.find(".fa-play").hide();a.find(".fa-pause").show()});$(".controls > .fa-step-backward, .controls > .fa-step-forward").on("click",function(a){a=$(a.target);var d=a.closest(".slideshow");if(!d.hasClass("sliding")){var d=d.find("img:visible"),c=null,c=a.hasClass("fa-step-forward")?d.next("img"):d.prev("img");c[0]&&(d.hide(),c.show())}});
window.setTimeout(c.nextSlide,3E3)};this.nextSlide=function(){$("div.slideshow").addClass("sliding");$("div.slideshow").find("img:visible").each(function(a,b){var c=$(b),h=c.closest(".slideshow");h.find(".fa-play").is(":visible")?h.removeClass("sliding"):c.fadeOut(1100,function(){var a=c.next("img");a[0]||(a=c.parent().find("img:first"));a.fadeIn(700,function(){h.removeClass("sliding")})})});window.setTimeout(c.nextSlide,5E3)};this.init=function(){a()};return this}.apply({});
