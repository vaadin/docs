import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/split-layout';
import './master-content';
import './detail-content';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('split-layout-orientation')
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
      <vaadin-split-layout style="max-height: 350px;" orientation="vertical">
        <master-content></master-content>
        <detail-content></detail-content>
      </vaadin-split-layout>
      <!-- end::snippet[] -->
    `;
  }
}
