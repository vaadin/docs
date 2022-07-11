import 'Frontend/demo/init'; // hidden-source-line

import { DateTimePicker } from '@vaadin/date-time-picker';

import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/date-time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-time-picker-internationalization')
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
        monthNames: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        week: 'Week',
        today: 'Today',
        cancel: 'Cancel',
        firstDayOfWeek: 0,
      };
    }
  }

  render() {
    return html`
      <vaadin-date-time-picker label="Meeting date and time"></vaadin-date-time-picker>
    `;
  }
  // end::snippet[]
}
