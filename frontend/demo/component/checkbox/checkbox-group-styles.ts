import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/checkbox-group';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-group-styles')
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
        <vaadin-checkbox-group theme="helper-above-field"
          label="Label" helper-text="Helper text"
          style="--vaadin-input-field-border-width: 1px;">
          <!-- end::snippet[] -->
          <vaadin-checkbox value="1" label="Item 1"></vaadin-checkbox>
          <vaadin-checkbox value="2" label="Item 2"></vaadin-checkbox>
          <vaadin-checkbox value="3" label="Item 3"></vaadin-checkbox>
          <!-- tag::snippet[] -->
        </vaadin-checkbox-group>
        <!-- end::snippet[] -->
    `;
  }
}
