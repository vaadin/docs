import 'Frontend/demo/init';
import React, { type ComponentClass, type FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
import type { CSSResult } from 'lit';
import { applyTheme } from 'Frontend/generated/theme';

export function reactExample(
  Example: ComponentClass<any> | FunctionComponent<any>,
  hostStyles?: CSSResult
) {
  return class ReactExampleWrapper extends HTMLElement {
    constructor() {
      super();

      const root = this.attachShadow({ mode: 'open' });
      // Apply the theme to the shadow root
      applyTheme(root);

      if (hostStyles) {
        // Apply the host styles to the shadow root
        const style = document.createElement('style');
        style.textContent = hostStyles.cssText;
        root.appendChild(style);
      }

      // Render the React component into the shadow root
      createRoot(root).render(React.createElement(Example));
    }
  };
}
