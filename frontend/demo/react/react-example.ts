import React, { type ComponentClass, type FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
import { applyTheme } from 'Frontend/generated/theme';
import 'Frontend/demo/init';

export function reactExample(Example: ComponentClass<any> | FunctionComponent<any>) {
  return class ReactExampleWrapper extends HTMLElement {
    constructor() {
      super();

      const root = this.attachShadow({ mode: 'open' });
      applyTheme(root);
      createRoot(root).render(React.createElement(Example));
    }
  };
}
