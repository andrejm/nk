import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
// require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';


$(document).foundation();

////////////////////////////////////////////////// FIXED HEADER ON SCROLL UP


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var $topbar = $('.js-topbar');
var $menuToggle = $( '.js-menutoggle' );
var $openMenuItem = $( '.nk-menu__href' );
var menuOpenClass = 'header--open';
var topbarHeight = 0;
var currentScrollTop = 0;
var slideSpeed = 200;


function slideUpTopbar() {
	$topbar.animate({ "top": '-' + topbarHeight + 'px' }, slideSpeed );
}

function slideDownTopbar() {
	$topbar.animate({ "top": "0px" }, slideSpeed );
}

function refreshTopbarHeight() {
	return $topbar.outerHeight()
}

function closeMenu() {
	$('.header').removeClass( menuOpenClass );
}

function openMenu() {
	$('.header').addClass( menuOpenClass );
	$topbar.css({ "top": "0px" });
}

function menuIsOpen() {
	return $topbar.hasClass( menuOpenClass );
}

var fixHeader = debounce( function() {
	// console.log( $(window).scrollTop(), currentScrollTop );
	if( $(window).scrollTop() < currentScrollTop ) {
		// console.log( 'idem hore' );
		if( $(window).scrollTop() <= $(window).height() ) {
			//hide topbar
			slideUpTopbar();
			//if not menu open
		} else {
			slideDownTopbar();
		}
	} else {
		// console.log( 'idem dole' );
		if( !menuIsOpen() ) {
			// console.log( 'schovat' );
			slideUpTopbar();
		}
		// slideUpTopbar();
	}

	currentScrollTop = $(window).scrollTop();
}, 100, false );


jQuery(document).ready(function($) {
	//set topbar position just above viewport
	topbarHeight = refreshTopbarHeight();
	$topbar.css( 'top', '-' + topbarHeight + 'px');
	
	//on scroll up animate topbar - put debounced function here
	// $topbar.animate({ "top": "+=" + topbarHeight + "px" }, "slow" );
	$(window).on( 'scroll', fixHeader );

	//on screen resize refreshTopbarHeight();
	$(window).on( 'resize', debounce( refreshTopbarHeight(), 150 ));

	$menuToggle.on( 'click', function() {
		if( $(this).parents('.header').hasClass( menuOpenClass) ) {
			closeMenu();
		} else {
			openMenu();
		}
	} );

	$openMenuItem.on( 'click', function() {
		if( menuIsOpen ) {
			closeMenu();
		}
	});
});

// jQuery(document).ready(function($) {
// 	$(window).on( 'scroll', fixHeader );
// 	// $(window).on( 'resize', debounce( function() {
// 	// 	headerHeight = $header.outerHeight();
// 	// }, 150 ));
// });




