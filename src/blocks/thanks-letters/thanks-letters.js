const thanksLettersBlocks = document.querySelectorAll('.thanks-letters');
if (thanksLettersBlocks.length) {
  thanksLettersBlocks.forEach((block) => {
    const swiper = block.querySelector('.swiper');

    if (!swiper) return;

    new Swiper(swiper, {
      // loop: true,
      spaceBetween: 15,
      slidesPerView: "auto",
      // centeredSlides: true,
      breakpoints: {
        768: {
          spaceBetween: 30,
        }
      },
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
