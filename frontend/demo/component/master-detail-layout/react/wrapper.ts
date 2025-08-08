import 'Frontend/demo/init';
import React, { type ComponentClass, type FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
import { applyTheme } from 'Frontend/generated/theme';

/**
 * Custom wrapper for rendering Master Detail Layout examples into an iframe. Compared to the usual
 * wrapper, this renders the example in the light DOM to allow for proper view transitions. It also
 * applies height styles so that the example takes up the full height of the iframe.
 * @param Example The React example component to wrap.
 */
export function masterDetailLayoutExample(Example: ComponentClass<any> | FunctionComponent<any>) {
  return class ExampleWrapper extends HTMLElement {
    constructor() {
      super();

      applyTheme(document);

      const style = document.createElement('style');
      style.textContent = `
        html, body, .render {
          height: 100%;
        }
      `;
      document.head.appendChild(style);
      this.style.height = '100%';

      createRoot(this).render(React.createElement(Example));
    }
  };
}
