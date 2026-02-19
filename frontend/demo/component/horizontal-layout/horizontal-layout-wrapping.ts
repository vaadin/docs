import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('horizontal-layout-wrapping')
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
      <p>Horizontal layout without wrapping:</p>
      <vaadin-horizontal-layout theme="spacing margin padding" style="width: 350px;">
        <div class="example-item">Item 1</div>
        <div class="example-item">Item 2</div>
        <div class="example-item">Item 3</div>
        <div class="example-item">Item 4</div>
        <div class="example-item">Item 5</div>
      </vaadin-horizontal-layout>

      <p>Horizontal layout with wrapping:</p>
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout theme="wrap spacing margin padding" style="width: 350px;">
        <!-- end::snippet[] -->
        <div class="example-item">Item 1</div>
        <div class="example-item">Item 2</div>
        <div class="example-item">Item 3</div>
        <div class="example-item">Item 4</div>
        <div class="example-item">Item 5</div>
        <!-- tag::snippet[] -->
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
