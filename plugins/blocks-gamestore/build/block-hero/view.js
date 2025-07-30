/******/ (() => { // webpackBootstrap
/*!********************************!*\
  !*** ./src/block-hero/view.js ***!
  \********************************/
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".slider-container");
  new Swiper(".slider-container", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    slidesPerView: 6,
    speed: 1500,
    grabCursor: true,
    mousewheel: true
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map