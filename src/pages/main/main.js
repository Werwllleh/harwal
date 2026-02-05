const toggleServices = document.querySelector(".services");
if (toggleServices) {
  const links = toggleServices.querySelectorAll(".services__links a");
  const contentItems = toggleServices.querySelectorAll(".services__item");

  if (!links || !contentItems) return;

  links.forEach((link, index) => {
    link.addEventListener("mouseenter", (e) => {
      links.forEach(elem => {
        elem.classList.remove('active')
      })

      contentItems.forEach(elem => {
        elem.classList.remove('active')
      })

      link.classList.add('active');
      contentItems[index].classList.add('active');
    })
  })
}

const animShowSections = document.querySelectorAll(".anim-show");
if (animShowSections.length) {
  gsap.utils.toArray('.anim-show').forEach((section) => {
    gsap.fromTo(
      section,
      {
        opacity: 0,
        // y: 30,
      },
      {
        opacity: 1,
        // y: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%', // когда верх секции дошёл до 80% экрана
          toggleActions: 'play none none none',
        },
      }
    )
  })
}
