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
	callback: function (box) {
		console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
	}
});
wow.init();
document.getElementById('moar').onclick = function () {
	var section = document.createElement('section');
	section.className = 'section--purple wow fadeInDown';
	this.parentNode.insertBefore(section, this);
};


// Hero slider 
$('.carousel').carousel({
	interval: 1000
})