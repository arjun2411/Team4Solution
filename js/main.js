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