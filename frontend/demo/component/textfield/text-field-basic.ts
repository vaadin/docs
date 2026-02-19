import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('text-field-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field label="Street Address" value="Ruukinkatu 2" clear-button-visible>
        <vaadin-icon slot="prefix" icon="vaadin:map-marker"></vaadin-icon>
      </vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
