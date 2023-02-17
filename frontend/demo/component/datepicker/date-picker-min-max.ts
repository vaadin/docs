import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/date-picker';
import type { DatePickerChangeEvent } from '@vaadin/date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { addDays, formatISO, isAfter, isBefore } from 'date-fns';
import dateFnsParse from 'date-fns/parse';

@customElement('date-picker-min-max')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private errorMessage = '';

  @state()
  private today = '';

  @state()
  private upperLimit = '';

  protected override firstUpdated() {
    this.today = formatISO(Date.now(), { representation: 'date' });

    const upperLimit = addDays(Date.now(), 60);
    this.upperLimit = formatISO(upperLimit, { representation: 'date' });
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-picker
        .min="${this.today}"
        .max="${this.upperLimit}"
        label="Appointment date"
        helper-text="Must be within 60 days from today"
        .errorMessage="${this.errorMessage}"
        @change="${({ target }: DatePickerChangeEvent) => {
          const [value, min, max] = [target.value, this.today, this.upperLimit].map((date) =>
            dateFnsParse(date ?? '', 'yyyy-MM-dd', new Date())
          );
          if (isBefore(value, min)) {
            this.errorMessage = 'Too early, choose another date';
          } else if (isAfter(value, max)) {
            this.errorMessage = 'Too late, choose another date';
          } else {
            this.errorMessage = '';
          }
        }}"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
