/*global $*/
$(document).on("click",".navbar-collapse.in",function(e) {
    if( $(e.target).is("a") ) {
        $(this).collapse("hide");
    }
});

$(function(){
	// $(window).resize(function(){
	// 	if($(window).width() < 992){
	// 		$(".affix").css("position", "static");
	// 	}
	// });
	console.log($(window).width());
	$("nav").on("click", ".navbar-brand", function(){
		$("html, body").animate({ scrollTop: 0}, 1000);
	});

	$("nav").on("click", "#nav-listen-link", function(){
		$("html, body").animate({ scrollTop: $("#title-listen").offset().top}, 1000);
	});

	$("nav").on("click", "#nav-news-link", function(){
		$("html, body").animate({ scrollTop: $("#title-news").offset().top}, 1000);
	});

	$("nav").on("click", "#nav-subscribe-link", function(){
		$("html, body").animate({ scrollTop: $("#title-subscribe").offset().top}, 1000);
	});

	$("nav").on("click", "#nav-tour-link", function(){
		$("html, body").animate({ scrollTop: $("#tour-dates").offset().top}, 1000);
	});

	//set data-offset-top dynamically to height of section-header
	$("#tour-dates").affix({
	  offset: {
	    top: function() { return $(".section-header").height(); },
	    bottom: function() { return $("footer").outerHeight(true) * 2; }
	  }
	});

	//Hover over tour dates to purchase
	$("#tour-dates").on("mouseenter", ".thumbnail", function(){
		$(this).append("<i class='fa fa-ticket' aria-hidden='true'></i>");
	});

	$("#tour-dates").on("mouseleave", ".thumbnail", function(){
		$(this).find("i").remove();
	});
});


