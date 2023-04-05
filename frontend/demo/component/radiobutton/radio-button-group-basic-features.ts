import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/radio-group';
import '@vaadin/tooltip';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-group-basic-features')
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
        <vaadin-radio-button-group
          label="Label"
          helper-text="Helper text">
          <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
          <!-- tag::snippet[] -->
          <vaadin-radio-button value="1" label="Item 1"></vaadin-radio-button>
          <vaadin-radio-button value="2" label="Item 2"></vaadin-radio-button>
          <vaadin-radio-button value="3" label="Item 3"></vaadin-radio-button>
          <!-- end::snippet[] -->
        </vaadin-radio-button-group>
        <!-- end::snippet[] -->
    `;
  }
}
