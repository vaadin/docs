import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-picker';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('date-picker-date-format-indicator')
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
        label="Start date"
        placeholder="DD/MM/YYYY"
        helper-text="Format: DD/MM/YYYY"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
