import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/master-detail-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('master-detail-layout-vertical')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-master-detail-layout orientation="vertical"></vaadin-master-detail-layout>
      <!-- end::snippet[] -->
    `;
  }
}
