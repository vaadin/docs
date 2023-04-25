import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/number-field';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/tooltip';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-basic-features')
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
        <vaadin-number-field
          label="Label"
          helper-text="Helper text"
          placeholder="Placeholder"
          clear-button-visible>
          <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
          <span slot="prefix">$</span>
          <vaadin-icon slot="suffix" icon="vaadin:dollar"></vaadin-icon>
        </vaadin-number-field>
        <!-- end::snippet[] -->
    `;
  }
}
