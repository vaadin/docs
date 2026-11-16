import type { SideNav } from '@vaadin/side-nav';

// Accepts null so that React examples can pass it as a callback ref
export function patchSideNavNavigation(sideNav: SideNav | null) {
  if (!sideNav) {
    return;
  }
  setTimeout(() => {
    // Patch anchors of side-nav-items to prevent page navigation
    const items = sideNav.querySelectorAll('vaadin-side-nav-item');
    items.forEach((item) => {
      const anchor = item.shadowRoot!.querySelector('a');
      if (anchor?.hasAttribute('href')) {
        anchor.onclick = () => {
          // Update active state
          items.forEach((i) => i.removeAttribute('active'));
          item.setAttribute('active', '');
          // Toggle expanded state
          item.toggleAttribute('expanded');
          return false;
        };
      }
    });
  });
}

(window as any).patchSideNavNavigation = patchSideNavNavigation;
