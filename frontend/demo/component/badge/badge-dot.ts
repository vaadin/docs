import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/badge';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('badge-dot')
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
        <vaadin-badge theme="dot">Pending</vaadin-badge>
        <vaadin-badge theme="dot success">Confirmed</vaadin-badge>
        <vaadin-badge theme="dot warning">Warning</vaadin-badge>
        <vaadin-badge theme="dot error">Denied</vaadin-badge>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
