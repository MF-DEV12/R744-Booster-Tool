jQuery(window).load(function () {
    HeaderHolder();
    NavigationHolder();
    Footer();
    FooterMobile();
    jQuery("button").mouseup(function () {
        jQuery(this).blur();
    });

    

});

jQuery(window).on("scroll", function (e) {

    if (jQuery(this).scrollTop() > 360) {
        jQuery("#image-list").prev(".filter-wrap").addClass("navbar-fixed-top");
        jQuery("div#footer").addClass("navbar-fixed-bottom");
    } else {
        jQuery("div#footer").removeClass("navbar-fixed-bottom");
        jQuery("#image-list").prev(".filter-wrap").removeClass("navbar-fixed-top");
    }

});