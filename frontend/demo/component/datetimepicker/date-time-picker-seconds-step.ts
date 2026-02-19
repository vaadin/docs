import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-time-picker';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('date-time-picker-seconds-step')
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
        label="Message received"
        value="2020-06-12T15:45:08"
        step="1"
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
