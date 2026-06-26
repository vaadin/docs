import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/badge';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('badge-basic')
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
        <vaadin-badge>Pending</vaadin-badge>
        <vaadin-badge theme="success">Confirmed</vaadin-badge>
        <vaadin-badge theme="warning">Warning</vaadin-badge>
        <vaadin-badge theme="error">Denied</vaadin-badge>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
