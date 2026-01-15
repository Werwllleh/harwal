const buttonInfoElements = document.querySelectorAll('.button-info');
if (buttonInfoElements.length) {
  buttonInfoElements.forEach(element => {
    const actionButton = element.querySelector('.button-info__button');
    const description = element.querySelector('.button-info__description');

    if (!actionButton || !description) return;

    actionButton.addEventListener('click', (e) => {

      if (element.classList.contains('active')) {
        element.classList.remove('active');
      } else {
        element.classList.add('active');
      }
    })

    document.addEventListener('click', (e) => {
      buttonInfoElements.forEach(i => {
        if (!i.contains(e.target)) {
          i.classList.remove('active');
        }
      });
    });
  })
}
