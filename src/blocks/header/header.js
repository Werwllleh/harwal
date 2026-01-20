const header = document.querySelector('.header');
if (header) {
  const headerContacts = header.querySelector('.header-contacts');
  if (headerContacts) {
    let timer;

    headerContacts.addEventListener('mouseenter', () => {
      clearTimeout(timer);
      headerContacts.classList.add('active');
    });

    headerContacts.addEventListener('mouseleave', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        headerContacts.classList.remove('active');
      }, 100);
    });
  }

  const burgerButton = header.querySelector('.header__burger');
  if (burgerButton) {
    burgerButton.addEventListener('click', () => {
      burgerButton.classList.toggle('active');

      blockWrap(burgerButton.classList.contains('active'))

      if (burgerButton.classList.contains('active')) {
        header.classList.add('mobile-active');
      } else {
        header.classList.remove('mobile-active');
      }
    })

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        if (burgerButton.classList.contains('active')) {
          blockWrap(false)
          burgerButton.classList.remove('active');
          header.classList.remove('mobile-active');
        }
      }
    })
  }

  /*window.addEventListener('scroll', () => {
    if (scrollPosition() > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (header.classList.contains('scrolled') && scrollPosition() > 300) {
      header.classList.add('scrolled-show');
    } else {
      header.classList.remove('scrolled-show');
    }
  })*/

}

function scrollPosition() {
  return window.pageYOffset || document.documentElement.scrollTop;
}
