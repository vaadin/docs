export function patchAppLayoutNavigation(element: HTMLElement) {
  const links = element.querySelectorAll('a');
  if (links) {
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const current = element.querySelector('.text-primary');
        if (current) {
          current.classList.remove('text-primary');
        }
        link.classList.add('text-primary');
      });
    });
    links[0].click();
  }
}

(window as any).patchAppLayoutNavigation = patchAppLayoutNavigation;
