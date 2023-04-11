import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { formatISO, lastDayOfYear } from 'date-fns';

@customElement('date-picker-initial-position')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  private lastDayOfTheYear = lastDayOfYear(Date.now());

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-picker
        label="Q4 deadline"
        .initialPosition="${formatISO(this.lastDayOfTheYear, { representation: 'date' })}"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
