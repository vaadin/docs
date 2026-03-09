import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-time-picker';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('date-time-picker-minutes-step')
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
        value="2020-06-12T12:30"
        .step="${60 * 30}"
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
