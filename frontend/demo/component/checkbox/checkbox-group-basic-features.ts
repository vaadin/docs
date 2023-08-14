import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/checkbox-group';
import '@vaadin/tooltip';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-group-basic-features')
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
      <vaadin-checkbox-group label="Label" helper-text="Helper text">
        <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
        <!-- tag::snippet[] -->
        <vaadin-checkbox value="1" label="Item 1"></vaadin-checkbox>
        <vaadin-checkbox value="2" label="Item 2"></vaadin-checkbox>
        <vaadin-checkbox value="3" label="Item 3"></vaadin-checkbox>
        <!-- end::snippet[] -->
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
