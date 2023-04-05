import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/date-picker';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/tooltip';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-basic-features')
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
        <vaadin-date-picker
          label="Label"
          helper-text="Helper text"
          placeholder="Placeholder"
          clear-button-visible>
          <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
          <vaadin-icon slot="prefix" icon="vaadin:vaadin-h"></vaadin-icon>
        </vaadin-date-picker>
        <!-- end::snippet[] -->
    `;
  }
}
