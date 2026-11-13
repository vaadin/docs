// Accepts null so that React examples can pass it as a callback ref
export function patchAppLayoutNavigation(element: HTMLElement | null) {
  if (!element) {
    return;
  }
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
