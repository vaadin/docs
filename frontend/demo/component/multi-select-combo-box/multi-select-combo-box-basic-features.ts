import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/multi-select-combo-box';
import '@vaadin/icon';
import '@vaadin/icons';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('multi-select-combo-box-basic-features')
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
        <vaadin-multi-select-combo-box
          label="Label"
          helper-text="Helper text"
          placeholder="Placeholder"
          clear-button-visible
          .items="${['Value']}">
          <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
        </vaadin-multi-select-combo-box>
        <!-- end::snippet[] -->
    `;
  }

}
