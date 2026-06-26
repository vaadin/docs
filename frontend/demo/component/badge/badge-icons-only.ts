import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/badge';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('badge-icons-only')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-badge theme="success icon-only">
          <vaadin-icon icon="vaadin:check" slot="icon"></vaadin-icon>
          Confirmed
        </vaadin-badge>
        <vaadin-badge theme="error icon-only">
          <vaadin-icon icon="vaadin:close-small" slot="icon"></vaadin-icon>
          Cancelled
        </vaadin-badge>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
