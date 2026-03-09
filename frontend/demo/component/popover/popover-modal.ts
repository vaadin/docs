import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/popover';
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('popover-modal')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-button id="target">Discount</vaadin-button>
      <!-- tag::snippet[] -->
      <vaadin-popover for="target" modal with-backdrop>
        <vaadin-text-field label="Discount code"></vaadin-text-field>
        <vaadin-button>Apply</vaadin-button>
      </vaadin-popover>
      <!-- end::snippet[] -->
    `;
  }
}
