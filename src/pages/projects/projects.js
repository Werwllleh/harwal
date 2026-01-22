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
