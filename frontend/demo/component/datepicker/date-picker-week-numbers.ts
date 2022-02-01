import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/date-picker';
import { DatePicker } from '@vaadin/date-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-week-numbers')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('vaadin-date-picker')
  private datePicker?: DatePicker;

  // tag::snippet[]
  firstUpdated() {
    if (this.datePicker) {
      this.datePicker.i18n = {
        ...this.datePicker.i18n,
        firstDayOfWeek: 1,
      };
    }
  }

  render() {
    return html`
      <vaadin-date-picker label="Vacation start date" show-week-numbers></vaadin-date-picker>
    `;
  }
  // end::snippet[]
}
