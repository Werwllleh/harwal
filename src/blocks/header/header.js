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

}
