import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-picker';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/tooltip';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('date-picker-basic-features')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
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
        clear-button-visible
      >
        <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
        <vaadin-icon slot="prefix" icon="vaadin:vaadin-h"></vaadin-icon>
      </vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
