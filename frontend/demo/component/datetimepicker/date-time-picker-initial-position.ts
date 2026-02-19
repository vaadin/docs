import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-time-picker';
import { addMonths } from 'date-fns/addMonths';
import { formatISO } from 'date-fns/formatISO';
import { startOfMonth } from 'date-fns/startOfMonth';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

const startOfNextMonth = startOfMonth(addMonths(new Date(), 1));
const startOfNextMonthISOString = formatISO(startOfNextMonth, { representation: 'date' });

@customElement('date-time-picker-initial-position')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Meeting date and time"
        .initialPosition="${startOfNextMonthISOString}"
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
