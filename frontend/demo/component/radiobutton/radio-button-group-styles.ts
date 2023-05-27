import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/radio-group';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-group-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
        <!-- tag::snippet[] -->
        <vaadin-radio-group theme="helper-above-field"
          label="Label" helper-text="Helper text"
          style="--vaadin-input-field-border-width: 1px;">
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
