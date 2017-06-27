/*global $*/
$(function($){
/**
 * Scroll down to certain sections of landing page
 */
    $('a.page-scroll').on("click", function(event){
        $('html, body').stop().animate({
            scrollTop: ($($(this).attr('href')).offset().top)
        }, 1000);
        event.preventDefault();
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
    
/**
 * Close Collapsable Navbar on item click
 */
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });
    
});


