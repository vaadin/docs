import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/date-time-picker';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/tooltip';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-time-picker-basic-features')
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
      <vaadin-date-time-picker
        label="Label"
        helper-text="Helper text"
        date-placeholder="Date"
        time-placeholder="Time"
      >
        <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
      </vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
