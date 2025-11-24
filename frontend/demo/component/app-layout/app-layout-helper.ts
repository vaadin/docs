export function patchAppLayoutNavigation(element: HTMLElement) {
  const links = element.querySelectorAll('a');
  if (links) {
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });
  }
}

(window as any).patchAppLayoutNavigation = patchAppLayoutNavigation;
