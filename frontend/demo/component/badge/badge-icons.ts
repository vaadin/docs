import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/badge';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('badge-icons')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout theme="spacing">
        <vaadin-badge>
          <vaadin-icon icon="vaadin:clock" slot="icon"></vaadin-icon>
          Pending
        </vaadin-badge>
        <vaadin-badge theme="success">
          <vaadin-icon icon="vaadin:check" slot="icon"></vaadin-icon>
          Confirmed
        </vaadin-badge>
        <vaadin-badge theme="warning">
          <vaadin-icon icon="vaadin:warning" slot="icon"></vaadin-icon>
          Warning
        </vaadin-badge>
        <vaadin-badge theme="error">
          <vaadin-icon icon="vaadin:exclamation-circle-o" slot="icon"></vaadin-icon>
          Denied
        </vaadin-badge>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
