import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('custom-field-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field
        label="Enrollment period"
        helper-text="Cannot be longer than 30 days"
        required
      >
        <vaadin-date-picker></vaadin-date-picker>
        <vaadin-date-picker></vaadin-date-picker>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
