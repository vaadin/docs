import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('horizontal-layout-slots-wrapping')
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
      <vaadin-horizontal-layout theme="spacing padding wrap">
        <vaadin-horizontal-layout theme="spacing padding">
          <div class="example-item">Start</div>
          <div class="example-item">Start</div>
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout theme="spacing padding" slot="middle">
          <div class="example-item">Middle</div>
          <div class="example-item">Middle</div>
          <div class="example-item">Middle</div>
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout theme="spacing padding" slot="end">
          <div class="example-item">End</div>
          <div class="example-item">End</div>
        </vaadin-horizontal-layout>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
