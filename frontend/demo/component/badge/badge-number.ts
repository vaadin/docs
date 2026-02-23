import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/badge';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('badge-number')
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
        <vaadin-badge .number="${12}">Inbox</vaadin-badge>
        <vaadin-badge .number="${3}" theme="success">Completed</vaadin-badge>
        <vaadin-badge .number="${1}" theme="error">Failed</vaadin-badge>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
