import 'Frontend/demo/init'; // hidden-source-line
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
        <span theme="badge">Pending</span>
        <span theme="badge success">Confirmed</span>
        <span theme="badge warning">Warning</span>
        <span theme="badge error">Denied</span>
        <span theme="badge contrast">On hold</span>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
