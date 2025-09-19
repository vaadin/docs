import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('vertical-layout-padding')
export class Example extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('basic-layouts-example');
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" style="border: 0">
        <div style="width: 100%">
          <p>Vertical layout without padding:</p>
          <vaadin-vertical-layout theme="spacing" style="align-items: stretch">
            <div class="example-item">Item 1</div>
            <div class="example-item">Item 2</div>
            <div class="example-item">Item 3</div>
          </vaadin-vertical-layout>
        </div>
        <div style="width: 100%">
          <p>Vertical layout with padding:</p>
          <!-- tag::snippet[] -->
          <vaadin-vertical-layout theme="padding spacing" style="align-items: stretch">
            <!-- end::snippet[] -->
            <div class="example-item">Item 1</div>
            <div class="example-item">Item 2</div>
            <div class="example-item">Item 3</div>
            <!-- tag::snippet[] -->
          </vaadin-vertical-layout>
          <!-- end::snippet[] -->
        </div>
      </vaadin-horizontal-layout>
    `;
  }
}
