import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('basic-layouts-horizontal-layout-individual-alignment')
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
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout
        theme="spacing padding"
        class="height-4xl"
        style="align-items: stretch"
      >
        <div class="example-item" style="align-self: start">Item 1</div>
        <div class="example-item">Item 2</div>
        <div class="example-item" style="align-self: end">Item 3</div>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
