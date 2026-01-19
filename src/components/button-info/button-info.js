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
