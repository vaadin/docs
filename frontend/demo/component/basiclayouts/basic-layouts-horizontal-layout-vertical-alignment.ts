import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/horizontal-layout';
import '@vaadin/text-area';

@customElement('basic-layouts-horizontal-layout-vertical-alignment')
export class Example extends LitElement {
  constructor() {
    super();
  }
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
        style="align-items: center"
      >
        <vaadin-text-area label="Text area 1"></vaadin-text-area>
        <vaadin-text-area label="Text area 2"></vaadin-text-area>
        <vaadin-text-area label="Text area 3"></vaadin-text-area>
      </vaadin-horizontal-layout>
    <!-- end::snippet[] -->
    `;
  }
}
