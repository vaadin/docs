import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('horizontal-layout-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <div class="basic-layouts-example">
        <!-- tag::snippet[] -->
        <vaadin-horizontal-layout theme="spacing padding">
          <div class="example-item">Item 1</div>
          <div class="example-item">Item 2</div>
          <div class="example-item">Item 3</div>
        </vaadin-horizontal-layout>
        <!-- end::snippet[] -->
      </div>
    `;
  }
}
