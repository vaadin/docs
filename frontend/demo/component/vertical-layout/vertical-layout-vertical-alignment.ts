import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('vertical-layout-vertical-alignment')
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
        <vaadin-vertical-layout
          theme="spacing padding"
          class="height-4xl"
          style="justify-content: center"
        >
          <div class="example-item">Item 1</div>
          <div class="example-item">Item 2</div>
          <div class="example-item">Item 3</div>
        </vaadin-vertical-layout>
        <!-- end::snippet[] -->
      </div>
    `;
  }
}
