import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/horizontal-layout';
import '@vaadin/text-area';

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
        class="height-4xl" // hidden-source-line
        style="align-items: stretch"
      >
        <vaadin-text-area
          label="Text area 1"
          style="align-self: start"
        ></vaadin-text-area>
        <vaadin-text-area label="Text area 2"></vaadin-text-area>
        <vaadin-text-area
          label="Text area 3"
          style="align-self: end"
        ></vaadin-text-area>
      </vaadin-horizontal-layout>

    <!-- end::snippet[] -->
    `;
  }
}
