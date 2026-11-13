import type { AppLayout } from '@vaadin/app-layout';

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

// Forces the touch-optimized mode, which the example shows on every device.
// Accepts null so that React examples can pass it as a callback ref.
export function enableTouchOptimizedMode(appLayout: AppLayout | null) {
  if (!appLayout) {
    return;
  }
  appLayout.style.setProperty('--vaadin-app-layout-touch-optimized', 'true');
  (appLayout as any)._updateTouchOptimizedMode();
}

(window as any).patchAppLayoutNavigation = patchAppLayoutNavigation;
