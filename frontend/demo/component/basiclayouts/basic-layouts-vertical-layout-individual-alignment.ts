import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/button';
import '@vaadin/vertical-layout';

@customElement('basic-layouts-vertical-layout-individual-alignment')
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
        <vaadin-button style="align-self: end" theme="primary">Button 1</vaadin-button>
        <vaadin-button style="align-self: center"> Button 2</vaadin-button>
        <vaadin-button>Button 3</vaadin-button>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
