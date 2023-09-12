import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/button';
import '@vaadin/icon';
import '@vaadin/icons';

@customElement('icons-accessibility')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button aria-label="Close dialog" theme="icon">
        <vaadin-icon icon="vaadin:close" slot="prefix"></vaadin-icon>
      </vaadin-button>
      <!-- end::snippet[] -->
    `;
  }
}
