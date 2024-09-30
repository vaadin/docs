import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/popover';
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { popoverRenderer } from '@vaadin/popover/lit.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('popover-modal')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-button id="target">Discount</vaadin-button>
      <!-- tag::snippet[] -->
      <vaadin-popover
        for="target"
        modal
        with-backdrop
        ${popoverRenderer(this.popoverRenderer)}
      ></vaadin-popover>
      <!-- end::snippet[] -->
    `;
  }

  popoverRenderer() {
    return html`
      <vaadin-text-field label="Discount code"></vaadin-text-field>
      <vaadin-button>Apply</vaadin-button>
    `;
  }
}
