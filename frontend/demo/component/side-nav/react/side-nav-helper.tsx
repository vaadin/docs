import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';

export function patchSideNavNavigation(sideNav) {
  setTimeout(() => {
    // Patch anchors of side-nav-items to prevent page navigation
    const items = sideNav.querySelectorAll('vaadin-side-nav-item');
    items.forEach((item) => {
      const anchor = item.shadowRoot.querySelector('a');
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

const Example = () => {
  return null;
};

export default reactExample(Example);
