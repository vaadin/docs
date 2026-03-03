import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/badge';
import '@vaadin/horizontal-layout';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('badge-color')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout theme="spacing">
        <vaadin-horizontal-layout theme="spacing">
          <vaadin-badge>Pending</vaadin-badge>
          <vaadin-badge theme="success">Confirmed</vaadin-badge>
          <vaadin-badge theme="warning">Warning</vaadin-badge>
          <vaadin-badge theme="error">Denied</vaadin-badge>
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout theme="spacing">
          <vaadin-badge theme="filled">Pending</vaadin-badge>
          <vaadin-badge theme="success filled">Confirmed</vaadin-badge>
          <vaadin-badge theme="warning filled">Warning</vaadin-badge>
          <vaadin-badge theme="error filled">Denied</vaadin-badge>
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
