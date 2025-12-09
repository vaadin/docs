import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/radio-group';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('radio-button-group-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-radio-group theme="helper-above-field" label="Label" helper-text="Helper text">
        <!-- end::snippet[] -->
        <vaadin-radio-button value="1" label="Item 1"></vaadin-radio-button>
        <vaadin-radio-button value="2" label="Item 2"></vaadin-radio-button>
        <vaadin-radio-button value="3" label="Item 3"></vaadin-radio-button>
        <!-- tag::snippet[] -->
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
