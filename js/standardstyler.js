var urlchunks = document.getElementById("hfURLChunks").value;
var baseurl = document.getElementById("hfBaseURL").value;
var tempsplit = urlchunks.split("|");
var currentpath = "DEFAULT";
if (tempsplit.length > 0) {
    currentpath = tempsplit[0];
}
/////////////////////////////////////////////////////////////////////////////

function HeaderHolder() {

    var holder = document.getElementById("CommonHeader");
    var dhtml = "";

    dhtml = dhtml + " <header class=\"header-top\">";
    dhtml = dhtml + "        <div class=\"container\">";
    dhtml = dhtml + "         <div class=\"row\">";
    dhtml = dhtml + "             <div class=\"col-xs-12 col-sm-6 col-md-6 col-lg-6\">";
    dhtml = dhtml + "                   Booster Tools: License Registration";
    //dhtml = dhtml + "                <img src=\"resources/images/White-Rodgers_logo.png\" class=\"wrlogo\"/>";
    dhtml = dhtml + "            </div>";
    dhtml = dhtml + "            <div class=\"col-xs-12 col-sm-6 col-md-6 col-lg-6\" style=\"text-align: right;\">";
    //dhtml = dhtml + "               <button class=\"btn flat-btn flat-btn-primary\">Admin Tool</button>";
    //dhtml = dhtml + "               <button class=\"btn flat-btn flat-btn-primary\">Admin Tool</button>";
    //dhtml = dhtml + "               <h5>Download <b><a style=\"font-size:16px;\" href=\"downloadimages.aspx?logo=emerson\">Emerson</a></b> or <b><a style=\"font-size:16px;\" href=\"downloadimages.aspx?logo=whiterodgers\">White-Rodgers</a></b> logo  &nbsp  <a target=\"_blank\" href=\"resources/Emerson logo_clear space[1].pdf\"><span class=\"glyphicon glyphicon-question-sign\" style=\"margin-right: 5px; top: 3px;\"></span>Guide for Logo Usage</a></h5>";
    //dhtml = dhtml + "                <img src=\"resources/images/logo.png\" class=\"emr\"/>";
    //dhtml = dhtml + "                <div id=\"namemarcomm\">marcomm creative ideas...</div>";
    dhtml = dhtml + "            </div>";
    dhtml = dhtml + "        </div>";
    dhtml = dhtml + "        </div>";
    dhtml = dhtml + " </header>";

    holder.innerHTML = dhtml;
}

function NavigationHolder() {
    var holder = document.getElementById("navigationmenu");
    var dhtml = "";

    dhtml = dhtml + " <div class=\"navbar navbar-default nav-custom-default\" id=\"\">";
    dhtml = dhtml + "   <div class=\"container\">";
    dhtml = dhtml + "     <div class=\"navbar-header\">";
    dhtml = dhtml + "       <button type=\"button\" id=\"menutoggle\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">";
    dhtml = dhtml + "         <span class=\"mdi mdi-menu\"></span>";
    dhtml = dhtml + "       </button>";
    dhtml = dhtml + "       <a class=\"navbar-brand\" href=\"sqms.aspx\">Name of System</a>";
    dhtml = dhtml + "     </div>";
    dhtml = dhtml + "     <div  id=\"navbar\" class=\"navbar-collapse collapse\">";
    dhtml = dhtml + "         <ul class=\"nav navbar-nav\">";
    dhtml = dhtml + "         <li id=\"sampleinput\"><a href=\"sampleinput.aspx\">Sample Input</a></li>";
    dhtml = dhtml + "         <li id=\"samplelist\" class=\"\"><a href=\"samplelist.aspx\">Sample List<div class=\"cart-counter\" id=\"ordercount\"></div></a></li>";
    dhtml = dhtml += "             <li class=\"dropdown information\">";
    dhtml = dhtml += "                 <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">";
    dhtml = dhtml += "                 Information";
    dhtml = dhtml += "                 <b class=\"caret\"></b>";
    dhtml = dhtml += "                 </a>";
    dhtml = dhtml += "             <ul class=\"dropdown-menu\">";
    dhtml = dhtml += "                 <li class=\"\"><a href=\"#\">First</a></li>";
    dhtml = dhtml += "                 <li class=\"\"><a href=\"#\">Second</a></li>";
    dhtml = dhtml += "                 <li class=\"\"><a href=\"#\">Third</a></li>";
    dhtml = dhtml += "                 <li class=\"\"><a href=\"#\">Fourth</a></li>";
    dhtml = dhtml += "                 <li class=\"\"><a href=\"#\">Fifth</a></li>";
    dhtml = dhtml += "             </ul>";
    dhtml = dhtml += "             </li>";
    dhtml = dhtml + "         </ul>";
    dhtml = dhtml + "     </div>";
    dhtml = dhtml + "   </div>";
    dhtml = dhtml + " </div>";

    //holder.innerHTML = dhtml;
}

function Footer() {
    var holder = document.getElementById("footer");
    var dhtml = "";

    dhtml = dhtml + " <div class=\"footer-bar\"></div>";
    dhtml = dhtml + " <div class=\"footer-holder\">";
    dhtml = dhtml + " <div class=\"container\" >";
    dhtml = dhtml + "           <div class=\"pull-left\">";
    dhtml = dhtml + "               <div>©2016 Emerson Electric Co. All rights reserved.</div>";
    dhtml = dhtml + "               <ul>";
    //dhtml = dhtml + "                   <li><small><a target='_blank' href=\"http://www.emerson.com/en-us/privacy-notice\">Privacy Notice</a></small></li>";
    //dhtml = dhtml + "                   <li><small><a target='_blank' href=\"http://www.emerson.com/en-us/sitemap\">Sitemap</a></small></li>";
    dhtml = dhtml + "                   <li><small><a target='_blank' href=\"http://www.emerson.com/en-us/terms-of-use\">Terms of Use</a></small></li>";
    //dhtml = dhtml + "                   <li><small><a href=\"#\" onclick=\"showLegal();\">Legal</a></small></li>";
    dhtml = dhtml + "               </ul>";
    dhtml = dhtml + "           </div>";
    dhtml = dhtml + "           <div class=\"pull-right\">";
    //dhtml = dhtml + "               <img src=\"resources/images/logo-emr.png\" />";
    dhtml = dhtml + "           </div>";
    dhtml = dhtml + " </div>";
    dhtml = dhtml + " </div>";
    dhtml = dhtml + " </div>";

    holder.innerHTML = dhtml;
}

function FooterMobile() {
    var holder = document.getElementById("footerMobile");
    var dhtml = "";

    dhtml = dhtml + " <div class=\"footer-bar\"></div>";
    dhtml = dhtml + " <div class=\"container\" >";
    dhtml = dhtml + " <div class=\"footer-holder\">";
    dhtml = dhtml + "           <div class=\"pull-left\">";
    dhtml = dhtml + "               <div>©2016 Emerson Electric Co. All rights reserved.</div>";
    dhtml = dhtml + "               <ul>";
    //dhtml = dhtml + "                   <li><small><a target='_blank' href=\"http://www.emerson.com/en-us/Pages/privacy-policy.aspx\">Privacy Policy</a></small></li>";
    dhtml = dhtml + "                   <li><small> <a target='_blank' href=\"http://www.emerson.com/en-us/terms-of-use\">Terms of Use</a></small></li>";
    //dhtml = dhtml + "                   <li><small>CONSIDER IT SOLVED.</small></li>";
    dhtml = dhtml + "               </ul>";
    dhtml = dhtml + "           </div>";
    dhtml = dhtml + "   </div>";
    dhtml = dhtml + " </div>";
    dhtml = dhtml + " </div>";

    holder.innerHTML = dhtml;
}

//jQuery(window).scroll(function (event) {
//    if (jQuery(window).scrollTop() > 20) {
//        if (jQuery(window).width() < 992) {
//            jQuery('.header-bar').css({              
//                'box-shadow': ' 0 8px 17px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19)',
//                '-webkit-box-shadow': ' 0 8px 17px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19)'
//            });
//        }
//        else {
//            jQuery('.header-bar').removeAttr('style');
//        }
//    }
//    else {
//        if (jQuery(window).width() > 992) {
//            jQuery('.header-bar').removeAttr('style');
//        }
//        else {
//            jQuery('.header-bar').removeAttr('style');
//        }

//    }
//});

//jQuery("#nav-icon3").click(function () {
//    if (jQuery(this).hasClass('open')) {
//        jQuery("#menu-mobile").collapse("hide").pre;
//        jQuery(".header-bar").removeClass("show");
//        jQuery(this).removeClass('open');
//        jQuery('body').removeClass('no-overflow');
//        jQuery('#menu-mobile').scrollTop(0);
//         if (window.matchMedia("(max-width: 991px)").matches) {
//            jQuery('#right-menu').each(function () {
//                jQuery(this).attr('src', 'resources/images/truck-icon.png');
//            });
//        }
//    }
//    else {
//        jQuery("#menu-mobile").collapse("show");
//        jQuery(".header-bar").addClass("show");
//        jQuery(this).addClass('open');
//        jQuery('body').addClass('no-overflow');
//        if (window.matchMedia("(max-width: 991px)").matches) {
//            jQuery('#right-menu').each(function () {
//                jQuery(this).attr('src', 'resources/images/truck-icon-white.png');
//            });
//        }        
//    }
//});

//jQuery(window).resize(function () {
//    if (window.matchMedia("(max-width: 991px)").matches) {
//        jQuery('#menu-mobile').scrollTop(0);
//        if (jQuery('#nav-icon3').hasClass('open')) {
//            jQuery('#right-menu').each(function () {
//                jQuery(this).attr('src', 'resources/images/truck-icon-white.png');
//            });
//        }
//        else { }
//    }
//    else {
//        jQuery('#menu-mobile').scrollTop(0);
//        jQuery('#right-menu').each(function () {
//            jQuery(this).attr('src', 'resources/images/truck-icon.png');
//        });
//    }
//});