
const buttonClickUi = document.querySelector('.button-click');
if (buttonClickUi) {
  buttonClickUi.addEventListener('click', (e) => {
    const pageContentWrap = document.querySelector('.page__content');
    if (pageContentWrap) {
      pageContentWrap.style.backgroundColor = getRandomColor();
    }
  })
}


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
