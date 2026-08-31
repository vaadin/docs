import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-picker';
import { eachDayOfInterval, formatISO, parseISO } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { DatePickerDateMetadata, DatePickerDateMetadataProvider } from '@vaadin/date-picker';
import { applyTheme } from 'Frontend/demo/theme';

// tag::snippet[]
// In a real application, these would query a booking service.
const isFullyBooked = (date: Date) => date.getDate() % 7 === 3;
const isAlmostFull = (date: Date) => date.getDate() % 5 === 0;

function getMetadata(date: Date): DatePickerDateMetadata | undefined {
  const isoDate = formatISO(date, { representation: 'date' });
  if (isFullyBooked(date)) {
    return { date: isoDate, disabled: true };
  }
  if (isAlmostFull(date)) {
    return { date: isoDate, part: 'limited' };
  }
  return undefined;
}

const dateMetadataProvider: DatePickerDateMetadataProvider = ({ start, end }) =>
  eachDayOfInterval({ start: parseISO(start), end: parseISO(end) })
    .map(getMetadata)
    .filter((metadata) => metadata !== undefined);
// end::snippet[]

@customElement('date-picker-date-metadata')
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
        label="Appointment date"
        helper-text="Highlighted dates are almost full"
        .dateMetadataProvider="${dateMetadataProvider}"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
