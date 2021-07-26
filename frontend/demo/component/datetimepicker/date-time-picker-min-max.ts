import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { format, addDays } from 'date-fns';

const dateTimeFormat = `yyyy-MM-dd'T'HH:00:00`;
const minValue = format(new Date(), dateTimeFormat);
const initialValue = format(addDays(new Date(), 7), dateTimeFormat);
const maxValue = format(addDays(new Date(), 60), dateTimeFormat);

@customElement('date-time-picker-min-max')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Appointment date and time"
        helper-text="Must be within 60 days from today"
        .value="${initialValue}"
        .min="${minValue}"
        .max="${maxValue}"
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
