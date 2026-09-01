import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-picker';
import { eachDayOfInterval, formatISO, parseISO } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { DatePickerDateMetadata, DatePickerDateMetadataProvider } from '@vaadin/date-picker';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('date-picker-date-metadata')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  // In a real application, these would query a booking service.
  private isFullyBooked = (date: Date) => date.getDate() % 7 === 3;

  private isAlmostFull = (date: Date) => date.getDate() % 5 === 0;

  private getMetadata = (date: Date): DatePickerDateMetadata | undefined => {
    const isoDate = formatISO(date, { representation: 'date' });
    if (this.isFullyBooked(date)) {
      return { date: isoDate, disabled: true };
    }
    if (this.isAlmostFull(date)) {
      return { date: isoDate, part: 'limited' };
    }
    return undefined;
  };

  // Keep a stable reference: assigning a new function clears the cache.
  private dateMetadataProvider: DatePickerDateMetadataProvider = ({ start, end }) =>
    eachDayOfInterval({ start: parseISO(start), end: parseISO(end) })
      .map(this.getMetadata)
      .filter((metadata) => metadata !== undefined);

  protected override render() {
    return html`
      <vaadin-date-picker
        label="Appointment date"
        helper-text="Highlighted dates are almost full"
        .dateMetadataProvider="${this.dateMetadataProvider}"
      ></vaadin-date-picker>
    `;
  }
  // end::snippet[]
}
