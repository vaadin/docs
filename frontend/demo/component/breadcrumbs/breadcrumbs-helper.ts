import type { Breadcrumbs } from '@vaadin/breadcrumbs';

// Accepts null so that React examples can pass it as a callback ref
export function patchBreadcrumbsNavigation(breadcrumbs: Breadcrumbs | null) {
  if (!breadcrumbs) {
    return;
  }
  setTimeout(() => {
    // Patch anchors of breadcrumbs-items to prevent page navigation
    const items = breadcrumbs.querySelectorAll('vaadin-breadcrumbs-item');
    items.forEach((item) => {
      const anchor = item.shadowRoot!.querySelector('a');
      if (anchor?.hasAttribute('href')) {
        anchor.onclick = (e) => {
          e.preventDefault();
          return false;
        };
      }
    });
  });
}

(window as any).patchBreadcrumbsNavigation = patchBreadcrumbsNavigation;
