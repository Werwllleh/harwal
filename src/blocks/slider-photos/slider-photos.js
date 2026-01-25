const sliderPhotosBlocks = document.querySelectorAll('.slider-photos');
if (sliderPhotosBlocks.length) {
  sliderPhotosBlocks.forEach(block => {
    const swiper = block.querySelector('.swiper');

    if (!swiper) return;

    new Swiper(swiper, {
      loop: true,
      spaceBetween: 30,
      slidesPerView: "auto",
      centeredSlides: true,
    });

    lightGallery(swiper, {
      plugins: [lgThumbnail],
      licenseKey: '0000-0000-0000-0000', // тестовый ключ
      speed: 300,
      download: false, // скрыть кнопку загрузки
      animateThumb: true,
      // zoomFromOrigin: false,
      // allowMediaOverlap: true,
      toggleThumb: true,
      thumbnail: true,
      selector: '.swiper-slide a',
      mobileSettings: {
        showCloseIcon: true
      }
    });
  })
}
