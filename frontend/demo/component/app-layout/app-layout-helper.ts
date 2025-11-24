export function patchAppLayoutNavigation(element: HTMLElement) {
  const links = element.querySelectorAll('a');
  if (links) {
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const current = element.querySelector('.active');
        if (current) {
          current.classList.remove('active');
        }
        link.classList.add('active');
      });
    });
    links[0].click();
  }
}

(window as any).patchAppLayoutNavigation = patchAppLayoutNavigation;
