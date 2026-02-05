const overlay = document.querySelector('.overlay');

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

  const headerNavItems = header.querySelectorAll('.header-nav__list--item');
  if (headerNavItems.length) {

    let timer;

    headerNavItems.forEach(navItem => {

      const subList = navItem.querySelector('.header-nav__sublist');

      if (!subList) return;


      navItem.addEventListener('mouseenter', () => {
        clearTimeout(timer);
        navItem.style.zIndex = 11;
        navItem.classList.add('active');
        overlay?.classList.add('active');
      });

      navItem.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        navItem.style.zIndex = '';
        timer = setTimeout(() => {
          navItem.classList.remove('active');
          overlay?.classList.remove('active');
        }, 100);
      });
    })
  }

  const mobileLinks = gsap.utils.toArray('.header-mobile__nav ul li a');

  function setStairs() {
    [...mobileLinks].reverse().forEach((el, idx) => {
      gsap.set(el, {
        opacity: 0,
        x: 200 + idx * 8,
      });
    });
  }

  function animateMobileNavMenu() {
    gsap.killTweensOf(mobileLinks);

    gsap.to(mobileLinks, {
      opacity: 1,
      x: 0,               // выравниваем в одну линию
      duration: 0.2,
      ease: "none",
      stagger: 0.08,      // мягкая последовательность
      clearProps: 'transform', // чтобы не висели inline стили (опционально)
    });
  }

  function disanimateMobileNavMenu() {
    gsap.killTweensOf(mobileLinks);

    [...mobileLinks].reverse().forEach((el, idx) => {
      gsap.to(el, {
        opacity: 0,
        ease: "none",
        x: 200 + idx * 8,
        duration: 0.25,
      });
    });
  }

  setStairs();

  const burgerButton = header.querySelector('.header__burger');
  if (burgerButton) {
    burgerButton.addEventListener('click', () => {

      if (window.innerWidth >= 1024) return;

      burgerButton.classList.toggle('active');

      blockWrap(burgerButton.classList.contains('active'))

      if (burgerButton.classList.contains('active')) {
        animateMobileNavMenu()
        header.classList.add('mobile-active');
      } else {
        header.classList.remove('mobile-active');
        disanimateMobileNavMenu()
      }
    })

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        if (burgerButton.classList.contains('active')) {
          blockWrap(false)
          burgerButton.classList.remove('active');
          header.classList.remove('mobile-active');
          disanimateMobileNavMenu()
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
