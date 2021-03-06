// Initialize Swiper
var swiper = new Swiper('.swiper-container', {
	spaceBetween: 30,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	autoplay: {
		delay: 4500,
		disableOnInteraction: false,
	},
});



// WOw Js 

wow = new WOW({
	animateClass: 'animated',
	offset: 100,
	mobile: false,
	callback: function (box) {
		console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
	}

});
wow.init();
//document.getElementById('moar').onclick = function () {
//var section = document.createElement('section');
//section.className = 'section--purple wow fadeInDown';
//this.parentNode.insertBefore(section, this);
//};

// repeat Animation



// Hero slider 
$('.carousel').carousel({
	interval: 10000
})
//scroll top
function scrollToTop() {
	var position =
		document.body.scrollTop || document.documentElement.scrollTop;
	if (position) {
		window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
		scrollAnimation = setTimeout("scrollToTop()", 30);
	} else clearTimeout(scrollAnimation);
}
//tab responsive acc

// heavily modified BS4 version of https://github.com/openam/bootstrap-responsive-tabs
var fakewaffle = (function ($, fakewaffle) {
	'use strict';

	fakewaffle.responsiveTabs = function (collapseDisplayed) {

		fakewaffle.currentPosition = 'tabs';

		var tabGroups = $('.nav-tabs.responsive');
		var hidden = '';
		var visible = '';
		var activeTab = '';

		// 		if ( collapseDisplayed === undefined ) {
		// 			collapseDisplayed = [ 'xs', 'sm' ];
		// 		}

		// 		$.each( collapseDisplayed, function () {
		// 			hidden  += ' banana-' + this;
		// 			visible += ' visible-' + this;
		// 		} );

		hidden = ' d-none d-md-flex';
		visible = ' d-md-none';

		$.each(tabGroups, function (index) {
			var collapseDiv;
			var $tabGroup = $(this);
			var tabs = $tabGroup.find('li a');

			if ($tabGroup.attr('id') === undefined) {
				$tabGroup.attr('id', 'tabs-' + index);
			}

			collapseDiv = $('<div></div>', {
				'class': 'card-soup responsive' + visible,
				'id': 'collapse-' + $tabGroup.attr('id')
			});

			$.each(tabs, function () {
				var $this = $(this);
				var oldLinkClass = $this.attr('class') === undefined ? '' : $this.attr('class');
				var newLinkClass = 'accordion-toggle collapsed';
				var oldParentClass = $this.parent().attr('class') === undefined ? '' : $this.parent().attr('class');
				var newParentClass = 'card';
				var newHash = $this.get(0).hash.replace('#', 'collapse-');

				if (oldLinkClass.length > 0) {
					newLinkClass += ' ' + oldLinkClass;
				}

				if (oldParentClass.length > 0) {
					oldParentClass = oldParentClass.replace(/\bactive\b/g, '');
					newParentClass += ' ' + oldParentClass;
					newParentClass = newParentClass.replace(/\s{2,}/g, ' ');
					newParentClass = newParentClass.replace(/^\s+|\s+$/g, '');
				}

				if ($this.parent().hasClass('active')) {
					activeTab = '#' + newHash;
				}

				collapseDiv.append(
					$('<div>').attr('class', newParentClass).html(
						$('<div>').attr('class', 'card-header').html(
							$('<h4>').attr('class', 'card-title').html(
								$('<a>', {
									'class': newLinkClass,
									'data-toggle': 'collapse',
									'data-parent': '#collapse-' + $tabGroup.attr('id'),
									'href': '#' + newHash,
									'html': $this.html()
								})
							)
						)
					).append(
						$('<div>', {
							'id': newHash,
							'class': 'collapse'
						})
					)
				);
			});

			$tabGroup.next().after(collapseDiv);
			$tabGroup.addClass(hidden);
			$('.tab-content.responsive').addClass(hidden);

			if (activeTab) {
				$(activeTab).collapse('show');
			}
		});

		fakewaffle.checkResize();
		fakewaffle.bindTabToCollapse();
	};

	fakewaffle.checkResize = function () {

		if ($('.card-soup.responsive').is(':visible') === true && fakewaffle.currentPosition === 'tabs') {
			fakewaffle.tabToPanel();
			fakewaffle.currentPosition = 'panel';
		} else if ($('.card-soup.responsive').is(':visible') === false && fakewaffle.currentPosition === 'panel') {
			fakewaffle.panelToTab();
			fakewaffle.currentPosition = 'tabs';
		}

	};

	fakewaffle.tabToPanel = function () {

		var tabGroups = $('.nav-tabs.responsive');

		$.each(tabGroups, function (index, tabGroup) {

			// Find the tab
			var tabContents = $(tabGroup).next('.tab-content').find('.tab-pane');

			$.each(tabContents, function (index, tabContent) {
				// Find the id to move the element to
				var destinationId = $(tabContent).attr('id').replace(/^/, '#collapse-');

				// Convert tab to panel and move to destination
				$(tabContent)
					.removeClass('tab-pane')
					.addClass('card-body fw-previous-tab-pane')
					.appendTo($(destinationId));

			});

		});

	};

	fakewaffle.panelToTab = function () {

		var panelGroups = $('.card-soup.responsive');

		$.each(panelGroups, function (index, panelGroup) {

			var destinationId = $(panelGroup).attr('id').replace('collapse-', '#');
			var destination = $(destinationId).next('.tab-content')[0];

			// Find the panel contents
			var panelContents = $(panelGroup).find('.card-body.fw-previous-tab-pane');

			// Convert to tab and move to destination
			panelContents
				.removeClass('card-body fw-previous-tab-pane')
				.addClass('tab-pane')
				.appendTo($(destination));

		});

	};

	fakewaffle.bindTabToCollapse = function () {

		var tabs = $('.nav-tabs.responsive').find('li a');
		var collapse = $('.card-soup.responsive').find('.card-collapse');

		// Toggle the panels when the associated tab is toggled
		tabs.on('shown.bs.tab', function (e) {

			if (fakewaffle.currentPosition === 'tabs') {
				var $current = $(e.currentTarget.hash.replace(/#/, '#collapse-'));
				$current.collapse('show');

				if (e.relatedTarget) {
					var $previous = $(e.relatedTarget.hash.replace(/#/, '#collapse-'));
					$previous.collapse('hide');
				}
			}

		});

		// Toggle the tab when the associated panel is toggled
		collapse.on('shown.bs.collapse', function (e) {

			if (fakewaffle.currentPosition === 'panel') {
				// Activate current tabs
				var current = $(e.target).context.id.replace(/collapse-/g, '#');
				$('a[href="' + current + '"]').tab('show');

				// Update the content with active
				var panelGroup = $(e.currentTarget).closest('.card-soup.responsive');
				$(panelGroup).find('.card-body').removeClass('active');
				$(e.currentTarget).find('.card-body').addClass('active');
			}

		});
	};

	$(window).resize(function () {
		fakewaffle.checkResize();
	});

	return fakewaffle;
}(window.jQuery, fakewaffle || {}));

fakewaffle.responsiveTabs();











document.documentElement.setAttribute("lang", "en");
document.documentElement.removeAttribute("class");

// Get IE or Edge browser version
var version = detectIE();

if (version !== false) {
	alert('Please view in Chrome/Safari/Firefox');
}
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}
//count js
(function ($) {
	"use strict";
	function count($this) {
		var current = parseInt($this.html(), 10);
		current = current + 1; /* Where 50 is increment */
		$this.html(++current);
		if (current > $this.data('count')) {
			$this.html($this.data('count'));
		} else {
			setTimeout(function () { count($this) }, 150);
		}
	}
	$(".stat-count").each(function () {
		$(this).data('count', parseInt($(this).html(), 10));
		$(this).html('0');
		count($(this));
	});
})(jQuery);
//client logo

var swiper = new Swiper('.swiper-clients-container', {
	loop: true,
	autoplay: {
		delay: 1500,
		disableOnInteraction: false,
	},
	breakpoints: {
		320: {
			slidesPerView: 3,
			spaceBetween: 0,
		},
		640: {
			slidesPerView: 4,
			spaceBetween: 0,
		},
		768: {
			slidesPerView: 5,
			spaceBetween: 0,
		},
		1024: {
			slidesPerView: 6,
			spaceBetween: 0,
		},
	}
});

$(function () {
	$('#verticalTab').jqTabs();

});