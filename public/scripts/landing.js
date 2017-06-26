/*global $*/
$(function(){
/**
 * Scroll down to certain sections of landing page
 */
    $("nav").on("click", "#nav-header-link", function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });
    
    $("nav").on("click", "#nav-projects-link", function(){
        $("html, body").animate({ scrollTop: $("#section-projects").offset().top}, 1000);
    });
    
    $("nav").on("click", "#nav-stack-link", function(){
        $("html, body").animate({ scrollTop: $("#section-stack").offset().top}, 1000);
    });
    
    $("nav").on("click", "#nav-contact-link", function(){
        $("html, body").animate({ scrollTop: $("#section-contact").offset().top}, 1000);
    });
    
/**
 * Listen to scroll to change navbar size
 */
    function checkScroll(){
        var startY = $('.navbar').height() * 0.5; //The point where the navbar changes in px
    
        if($(window).scrollTop() > startY){
            $('.navbar-brand').addClass("scrolled-nav");
            $('nav').removeClass("navbar-bigger");
        }else{
            $('.navbar-brand').removeClass("scrolled-nav");
            $('nav').addClass("navbar-bigger");
        }
    }
    
    if($('.navbar').length > 0){
        $(window).on("scroll load resize", function(){
            checkScroll();
        });
    }
});


