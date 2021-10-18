import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/date-time-picker';
import { DateTimePicker } from '@vaadin/date-time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-time-picker-week-numbers')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @query('vaadin-date-time-picker')
  private dateTimePicker?: DateTimePicker;

  firstUpdated() {
    if (this.dateTimePicker) {
      this.dateTimePicker.i18n = {
        ...this.dateTimePicker.i18n,
        firstDayOfWeek: 1,
      };
    }
  }

  render() {
    return html`
      <vaadin-date-time-picker
        label="Meeting date and time"
        show-week-numbers
      ></vaadin-date-time-picker>
    `;
  }
  // end::snippet[]
}
