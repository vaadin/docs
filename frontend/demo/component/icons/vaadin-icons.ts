import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/button';
import '@vaadin/horizontal-layout';

@customElement('vaadin-icons')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" class="items-center">
        <!-- tag::snippet[] -->
        <vaadin-icon icon="vaadin:phone"></vaadin-icon>
        <vaadin-icon icon="vaadin:calendar"></vaadin-icon>
        <vaadin-icon icon="vaadin:alarm"></vaadin-icon>
        <vaadin-button>
          <vaadin-icon icon="vaadin:bell"></vaadin-icon>
        </vaadin-button>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
