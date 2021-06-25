import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-field-basic')
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
      <vaadin-text-field label="Street Address" value="Ruukinkatu 2" clear-button-visible>
        <vaadin-icon slot="prefix" icon="vaadin:map-marker"></vaadin-icon>
      </vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
