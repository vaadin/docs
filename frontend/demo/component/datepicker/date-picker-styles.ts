import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-picker';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('date-picker-styles')
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
        theme="align-right small helper-above-field"
        label="Label"
        helper-text="Helper text"
        value="2020-06-12"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
