import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/date-time-picker';
import type { DateTimePicker } from '@vaadin/date-time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-time-picker-internationalization')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @query('vaadin-date-time-picker')
  private accessor dateTimePicker!: DateTimePicker;

  protected override firstUpdated() {
    this.dateTimePicker.i18n = {
      ...this.dateTimePicker.i18n,
      monthNames: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ],
      weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      today: 'Heute',
      cancel: 'Abbrechen',
      dateLabel: 'datum',
      timeLabel: 'zeit',
    };
  }

  protected override render() {
    return html`<vaadin-date-time-picker label="Sitzungsdatum"></vaadin-date-time-picker>`;
  }
  // end::snippet[]
}
