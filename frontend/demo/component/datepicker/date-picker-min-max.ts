import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { addDays, formatISO } from 'date-fns';

@customElement('date-picker-min-max')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private today = '';

  @state()
  private upperLimit = '';

  firstUpdated() {
    this.today = formatISO(Date.now(), { representation: 'date' });

    const upperLimit = addDays(Date.now(), 60);
    this.upperLimit = formatISO(upperLimit, { representation: 'date' });
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-picker
        .min="${this.today}"
        .max="${this.upperLimit}"
        label="Appointment date"
        helper-text="Must be within 60 days from today"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
