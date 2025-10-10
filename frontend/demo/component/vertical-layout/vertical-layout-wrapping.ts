import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vertical-layout';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('vertical-layout-wrapping')
export class Example extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('basic-layouts-example');
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="margin spacing" style="border: 0;">
        <div style="width: 100%;">
          <p>Vertical layout without wrapping:</p>
          <vaadin-vertical-layout
            theme="spacing padding"
            style="align-items: stretch; height: 200px;"
          >
            <div class="example-item">Item 1</div>
            <div class="example-item">Item 2</div>
            <div class="example-item">Item 3</div>
            <div class="example-item">Item 4</div>
          </vaadin-vertical-layout>
        </div>
        <div style="width: 100%;">
          <p>Vertical layout with wrapping:</p>
          <!-- tag::snippet[] -->
          <vaadin-vertical-layout
            theme="wrap spacing padding"
            style="align-items: stretch; height: 200px;"
          >
            <!-- end::snippet[] -->
            <div class="example-item">Item 1</div>
            <div class="example-item">Item 2</div>
            <div class="example-item">Item 3</div>
            <div class="example-item">Item 4</div>
            <!-- tag::snippet[] -->
          </vaadin-vertical-layout>
          <!-- end::snippet[] -->
        </div>
      </vaadin-horizontal-layout>
    `;
  }
}
