import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/time-picker';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('time-picker-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker label="Alarm" value="07:00"></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
