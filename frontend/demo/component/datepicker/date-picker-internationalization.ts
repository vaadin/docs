import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/date-picker';
import type { DatePicker } from '@vaadin/date-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-internationalization')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @query('vaadin-date-picker')
  private accessor datePicker!: DatePicker;

  protected override firstUpdated() {
    this.datePicker.i18n = {
      ...this.datePicker.i18n,
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
    };
  }

  protected override render() {
    return html`<vaadin-date-picker label="Sitzungsdatum"></vaadin-date-picker>`;
  }
  // end::snippet[]
}
