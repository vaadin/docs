import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('horizontal-layout-expanding-items')
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
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout theme="padding spacing">
        <div class="example-item" style="flex-grow: 1">Item 1</div>
        <div class="example-item">Item 2</div>
        <div class="example-item">Item 3</div>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
