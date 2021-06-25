import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('input-field-aria-label')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field aria-label="search" placeholder="Search" clear-button-visible>
        <vaadin-icon icon="vaadin:search" slot="prefix"></vaadin-icon>
      </vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
