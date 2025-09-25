import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('vertical-layout-individual-alignment')
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
      <vaadin-vertical-layout theme="spacing padding" style="align-items: start">
        <div class="example-item" style="align-self: end">Item 1</div>
        <div class="example-item" style="align-self: center">Item 2</div>
        <div class="example-item">Item 3</div>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
