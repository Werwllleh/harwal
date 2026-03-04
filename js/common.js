document.addEventListener('DOMContentLoaded', function () {
gsap.registerPlugin(ScrollTrigger,ScrollSmoother);
ScrollTrigger.refresh();

window.addEventListener('load', function () {
  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
});


const collapseBlocks = document.querySelectorAll('.collapse');
if (collapseBlocks.length) {
  collapseBlocks.forEach(collapseBlock => {

    const items = collapseBlock.querySelectorAll('.collapse-item');
    if (!items.length) return;

    items.forEach((item) => {

      const collapseBlockWrap = item.querySelector('.collapse-wrap');
      const collapseBlockData = item.querySelector('.collapse-data');

      if (item.classList.contains('active')) {
        collapseBlockWrap.style.maxHeight = getElementHeight(collapseBlockData);
        item.classList.add('active');
      }

      item.addEventListener('click', (e) => {

        if (
          e.target.closest('.collapse-wrap') ||
          e.target.closest('.collapse-data')
        ) {
          return;
        }

        if (!collapseBlockWrap || !collapseBlockData) return;

        const isActive = item.classList.contains('active');

        items.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.collapse-wrap').style.maxHeight = '';
        });

        if (!isActive) {
          collapseBlockWrap.style.maxHeight = getElementHeight(collapseBlockData);
          item.classList.add('active');
        }
      })
    })

    window.addEventListener('resize', () => {
      const collapseBlockActiveItem = collapseBlock.querySelector('.collapse-item.active');
      if (collapseBlockActiveItem) {
        const collapseStageInfo = collapseBlockActiveItem.querySelector('.collapse-wrap');
        const collapseStageList = collapseStageInfo?.querySelector('.collapse-data');

        collapseStageInfo.style.maxHeight = getElementHeight(collapseStageList);
      }
    })
  })
}

function getElementHeight(element) {
  return `${element.offsetHeight}px`;
}

const footer = document.querySelector('.footer');
if (footer) {
  const navGroups = footer.querySelectorAll('.footer__nav--group');
  if (navGroups.length) {
    navGroups.forEach(navGroup => {
      const actionButton = navGroup.querySelector('.footer__nav--icon');
      const listWrap = navGroup.querySelector('.footer__nav--items');
      const listInner = navGroup.querySelector('.footer__nav--list');

      if (!actionButton || !listWrap || !listInner) return;

      actionButton.addEventListener('click', () => {
        const isActive = navGroup.classList.contains('active');

        // закрываем все
        navGroups.forEach(group => {
          group.classList.remove('active');

          const wrap = group.querySelector('.footer__nav--items');
          if (wrap) wrap.style.maxHeight = '';
        });

        // если кликнули по закрытому — открываем
        if (!isActive) {
          navGroup.classList.add('active');
          listWrap.style.maxHeight = `${listInner.offsetHeight}px`;
        }
      });


    })

    window.addEventListener('resize', () => {
      const activeGroup = footer.querySelector('.footer__nav--group.active');
      if (!activeGroup) return;

      if (window.innerWidth >= 992) {
        activeGroup.classList.remove('active');
        const wrap = activeGroup.querySelector('.footer__nav--items');
        const inner = activeGroup.querySelector('.footer__nav--list');

        if (wrap && inner) {
          wrap.style.maxHeight = '';
        }
      }
    });
  }
}

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
    headerNavItems.forEach(navItem => {
      const subList = navItem.querySelector('.header-nav__sublist');

      if (!subList) return;

      let timer;

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
          // Закрываем overlay только если ни один пункт не активен
          if (!header.querySelector('.header-nav__list--item.active')) {
            overlay?.classList.remove('active');
          }
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

const subsectionsBlocks = document.querySelectorAll('.subsections');
if (subsectionsBlocks.length) {
  subsectionsBlocks.forEach(subsectionBlock => {
    const buttons = subsectionBlock.querySelectorAll('.subsections__list li button');
    if (!buttons.length) return;

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionName = button.dataset.subsection;
        const section = document.querySelector(`[data-section="${sectionName}"`);

        if (!sectionName || !section) return;

        section.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      })
    })

  })
}

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

const breadcrumbs = document.querySelector('.breadcrumbs')
if (breadcrumbs) {
  const list = breadcrumbs.querySelector('.breadcrumbs__list');

  const checkOverflow = () => {
    // Проверяем переполнение справа
    const hasRightOverflow = list.scrollWidth > list.clientWidth && list.scrollLeft < (list.scrollWidth - list.clientWidth-1);
    breadcrumbs.classList.toggle('breadcrumbs--has-right-overflow', hasRightOverflow);

    // Проверяем скролл слева
    const hasLeftOverflow = list.scrollLeft > 0;
    breadcrumbs.classList.toggle('breadcrumbs--has-left-overflow', hasLeftOverflow);
  };

  // Первоначальная проверка
  checkOverflow();

  // Проверка при скролле
  list.addEventListener('scroll', checkOverflow);

  // Проверка при изменении размера окна
  window.addEventListener('resize', checkOverflow);
}

const buttonInfoElements = document.querySelectorAll('.button-info');
if (buttonInfoElements.length) {
  buttonInfoElements.forEach(element => {
    const actionButton = element.querySelector('.button-info__button');
    const description = element.querySelector('.button-info__description');

    if (!actionButton || !description) return;

    actionButton.addEventListener('click', (e) => {
      e.stopPropagation();

      const isActive = element.classList.contains('active');

      if (isActive) {
        element.classList.remove('active');

        setTimeout(() => {
          description.style.left = ''
          description.style.right = ''
          description.style.transformOrigin = ''
          description.style.display = ''
        }, 150)
      } else {
        document.querySelectorAll('.button-info.active').forEach(i => {
          i.classList.remove('active');
        })

        description.style.left = ''
        description.style.right = ''
        description.style.transformOrigin = ''
        description.style.display = 'block';

        const rect = description.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        if (rect.right + 200 > viewportWidth) {
          description.style.left = '';
          description.style.right = '3rem';
          description.style.transformOrigin = 'right top';
        } else {
          description.style.left = '3rem';
          description.style.right = '';
          description.style.transformOrigin = 'left top';
        }

        element.classList.add('active');
      }
    });
  });

  document.addEventListener('click', (e) => {
    buttonInfoElements.forEach(i => {
      const description = i.querySelector('.button-info__description');

      if (!i.contains(e.target)) {
        i.classList.remove('active');

        setTimeout(() => {
          description.style.left = ''
          description.style.right = ''
          description.style.transformOrigin = ''
          description.style.display = ''
        }, 150)

      }

    });
  });
}



initForms();

function initForms() {
  const forms = document.querySelectorAll('form');
  if (!forms.length) return;

  forms.forEach((form) => {
    form.setAttribute('novalidate', '');
    startValidation(form);
  });
}

function startValidation(form) {
  const formType = form.dataset.form;

  const fieldset = form.querySelector('fieldset');
  const onlyWords = /^[a-zA-Zа-яА-ЯёЁ"'«».,\s-]+$/;

  const inputList = Array.from(
    form.querySelectorAll(
      'input:not([hidden]):not([type="checkbox"]):not([type="radio"]):not([data-input="segmented"])'
    )
  );

  const checkboxList = Array.from(
    form.querySelectorAll('input[type="checkbox"][required]:not([hidden])')
  );

  if (!inputList.length) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const ok = validateAll({ showErrors: true, requiredOnly: true });

    if (!ok) {
      formError(form, true);
      if (fieldset) fieldset.removeAttribute('disabled');
      return;
    }

    formError(form, false);

    const formData = new FormData(form);
    console.log(Array.from(formData));

    if (fieldset) fieldset.setAttribute('disabled', '');

    if (formType === 'consultation') {
      closeModalByName?.('consultation');
    }

    setTimeout(() => {
      fieldset?.removeAttribute('disabled');
      showModal?.('success');
    }, 300);

    resetForm(form);
  });

  form.addEventListener('input', (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;

    if (el.type !== 'checkbox') {
      el.classList.toggle('filled', !!el.value.length);
      formError(form, false);

      if (el.required || el.value.trim().length) {
        validateOne(el, { showError: false });
      } else {
        clearOne(el);
      }
    } else {
      if (el.required) {
        if (el.checked) el.setAttribute('valid', 'true');
        else el.removeAttribute('valid');
      }
    }
  });

  form.addEventListener('focusin', (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.type === 'checkbox') return;

    el.classList.add('focus');
    el.classList.remove('error');
    formError(form, false);
  });

  form.addEventListener('focusout', (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.type === 'checkbox') return;

    el.classList.remove('focus');

    if (!el.value.length) {
      el.classList.remove('filled');

      if (!el.required) {
        clearOne(el);
        return;
      }
    }

    validateOne(el, { showError: false });
  });

  function validateAll({ showErrors, requiredOnly }) {
    let ok = true;

    // inputs
    inputList.forEach((input) => {
      if (isHidden(input)) return;

      if (requiredOnly && !input.required) {
        if (!input.value.trim().length) clearOne(input);
        return;
      }

      const v = validateOne(input, { showError: showErrors });
      if (!v) ok = false;
    });

    checkboxList.forEach((cb) => {
      if (isHidden(cb)) return;

      if (cb.checked) {
        cb.setAttribute('valid', 'true');
        cb.classList.remove('error');
      } else {
        cb.removeAttribute('valid');
        if (showErrors) cb.classList.add('error');
        ok = false;
      }
    });

    return ok;
  }

  function validateOne(input, { showError }) {
    const type = input.dataset.input;
    if (!type) return true;

    const value = (input.value || '').trim();

    if (input.required && value === '') {
      setInvalid(input, showError ? 'Заполните поле' : '');
      return false;
    }

    if (!input.required && value === '') {
      clearOne(input);
      return true;
    }

    let result = { valid: true, message: '' };

    switch (type) {
      case 'name': {
        if (!onlyWords.test(value) || value.length < 3) {
          result = { valid: false, message: 'Некорректное имя' };
        }
        break;
      }

      case 'phone': {
        const digits = value.replace(/\D/g, '');

        if (digits.length !== 11) {
          result = { valid: false, message: 'Некорректный номер' };
        }
        break;
      }

      case 'param': {
        result = { valid: true, message: '' };
        break;
      }

      default: {
        result = { valid: false, message: 'Некорректное значение' };
      }
    }

    if (!result.valid) {
      setInvalid(input, showError ? result.message : '');
      return false;
    }

    setValid(input);
    return true;
  }

  function isHidden(el) {
    return !!el.closest('.hide');
  }

  function setValid(input) {
    input.classList.remove('error');
    input.setAttribute('valid', 'true');
    setErrorText(input, '');
  }

  function setInvalid(input, message) {
    input.removeAttribute('valid');

    if (message) {
      input.classList.add('error');
      setErrorText(input, message);
    } else {
      input.classList.remove('error');
      setErrorText(input, '');
    }
  }

  function clearOne(input) {
    input.classList.remove('error');
    input.removeAttribute('valid');
    setErrorText(input, '');
  }

  function setErrorText(input, text) {
    const type = input.dataset.input;
    if (!type) return;

    const label = input.closest('.input-field');
    const errorEl = label?.querySelector(`[data-input-error="${type}"]`);
    if (errorEl) errorEl.textContent = text || '';
  }
}

function formError(form, active) {
  const formErrorField = form.querySelector('[data-form-error]');
  if (!formErrorField) return;

  if (!active) {
    formErrorField.classList.remove('active');
  } else {
    formErrorField.textContent = 'Проверьте корректное заполнение полей';
    formErrorField.classList.add('active');
  }
}

function resetForm(form) {
  setTimeout(() => {
    form.reset();

    const inputs = form.querySelectorAll('input:not([type="checkbox"])');
    inputs.forEach((input) => {
      input.classList.remove('focus', 'filled', 'error');
      input.removeAttribute('valid');

      const type = input.dataset.input;
      if (!type) return;

      const label = input.closest('.input-field');
      const errorEl = label?.querySelector(`[data-input-error="${type}"]`);
      if (errorEl) errorEl.textContent = '';
    });

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.removeAttribute('valid');
      checkbox.classList.remove('error');
    });

    formError(form, false);
  }, 300);
}




const inputsPhones = document.querySelectorAll('.input--phone');
if (inputsPhones.length) {
  inputsPhones.forEach(inputPhone => {
    if (inputPhone) {
      inputPhone.setAttribute('maxlength', '16');
      inputPhone.setAttribute('minlength', '16');

      const maskOptions = {
        mask: '+{7} 000 000-00-00',
        overwrite: true
      };

      const maskLength = maskOptions.mask.length - 2;
      inputPhone.setAttribute('maxlength', `${maskLength}`);
      inputPhone.setAttribute('minlength', `${maskLength}`);

      IMask(inputPhone, maskOptions);
    }
  })
}

const modalList = document.querySelectorAll('.modal')

if (modalList.length) {

  modalList.forEach((modal) => {
    const closeBtns = modal.querySelectorAll('.modal--close');

    let mouseDownInside = false;

    modal.addEventListener('mousedown', (evt) => {
      mouseDownInside = !!evt.target.closest('.modal__window');
    });
    modal.addEventListener('mouseup', (evt) => {
      const mouseUpInside = !!evt.target.closest('.modal__window');

      if (!mouseDownInside && !mouseUpInside) {
        closeModal(modal);
      }
    });

    if (closeBtns.length) {
      closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener('click', () => closeModal(modal))
      })
    }

    /*modal.addEventListener('click', (evt) => {
      if (!evt.target.closest('.modal__window')) {
        closeModal(modal)
      }
    })*/
  })

  const triggerList = document.querySelectorAll('*[data-modal]')
  if (triggerList.length) {
    triggerList.forEach((trigger) => {

      trigger.addEventListener('click', () => {
        showModal(trigger.dataset.modal)
      })
    })
  }
}

function getScrollbarWidth() {
  const hasScrollbar = document.documentElement.scrollHeight > document.documentElement.clientHeight;

  if (!hasScrollbar) return 0;

  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.width = '100px';
  outer.style.height = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';

  document.body.appendChild(outer);

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  document.body.removeChild(outer);

  return scrollbarWidth;
}


function blockWrap(status) {
  const wrap = document.querySelector('html');

  if (status) {
    // wrap.style.overflow = 'hidden';
    wrap.classList.add('block');
    wrap.style.marginRight = getScrollbarWidth() + 'px';
  } else {
    // wrap.style.overflow = '';
    wrap.classList.remove('block');
    wrap.style.marginRight = '';
  }
}

function showModal(name) {
  const modal = document.querySelector(`.modal-${name}`)
  if (!modal) {
    console.error(`Модальное окно ${name} не найдено`)
    return
  }

  blockWrap(true)

  modal.style.display = 'flex'

  setTimeout(() => {
    modal.classList.add('modal--show')
  }, 50)

}

function closeModal(modal) {
  if (!modal) return;

  const headerSearchActive = document.querySelector('.header-search.shown');
  const headerMultiblockActive = document.querySelector('.header-multiblock.active');

  setTimeout(() => {
    modal.classList.remove('modal--show');

    setTimeout(() => {
      if (!headerSearchActive && !headerMultiblockActive) {
        blockWrap(false)
      }
      modal.style.display = '';
    }, 300);
  });
}

function closeModalByName(name) {
  const modal = document.querySelector(`.modal-${name}`)

  if (!modal) return;

  if (modal.classList.contains('modal--show')) {
    modal.classList.remove('modal--show')

    setTimeout(() => {
      blockWrap(false)
      modal.style.display = ''
    }, 300)
  }
}







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
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => gsap.to(section, { opacity: 1, duration: 0.6 }),
          onLeave: () => gsap.to(section, { opacity: 0, duration: 0.4 }),
          onEnterBack: () => gsap.to(section, { opacity: 1, duration: 0.6 }),
          onLeaveBack: () => gsap.to(section, { opacity: 0, duration: 0.4 }),
        },
      }
    )
  })
}







const projectTypes = document.querySelector('.projects-types');
if (projectTypes) {
  const projectTypesTabs = projectTypes.querySelectorAll('.projects-types__tabs button');
  const projectTypesCategories = projectTypes.querySelectorAll('.projects-types__category');

  if (!projectTypesTabs || !projectTypesCategories) return;

  projectTypesTabs[0].classList.add('active');
  projectTypesCategories[0].style.display = 'block';
  projectTypesCategories[0].classList.add('active');

  projectTypesTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      const categoryValue = tab.dataset.projectTab;
      if (!categoryValue) return;

      const projectTypeCategory = projectTypes.querySelector(`.projects-types__category[data-project-category="${categoryValue}"]`)
      if (!projectTypeCategory) return;

      if (projectTypeCategory.classList.contains('active')) return;

      projectTypesTabs.forEach(i => i.classList.remove('active'));

      projectTypesCategories.forEach(i => {
        i.classList.remove('active');
        i.style.display = '';
      });

      tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

      tab.classList.add('active');
      projectTypeCategory.style.display = 'block';
      setTimeout(() => {
        projectTypeCategory.classList.add('active');
      }, 50)
    })
  })
}






});