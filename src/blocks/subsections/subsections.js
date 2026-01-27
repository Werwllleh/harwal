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
