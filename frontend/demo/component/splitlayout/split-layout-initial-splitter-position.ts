import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/split-layout';
import './master-content';
import './detail-content';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('split-layout-initial-splitter-position')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-split-layout style="max-height: 280px;">
        <master-content style="width: 70%;"></master-content>
        <detail-content style="width: 30%;"></detail-content>
      </vaadin-split-layout>
      <!-- end::snippet[] -->
    `;
  }
}
