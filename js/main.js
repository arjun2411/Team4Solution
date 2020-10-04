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