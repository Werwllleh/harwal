const mainServices = document.querySelector(".services");
if (mainServices) {
  const links = mainServices.querySelectorAll(".services__links a");
  const contentItems = mainServices.querySelectorAll(".services__item");

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
