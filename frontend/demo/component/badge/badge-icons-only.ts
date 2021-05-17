import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vaadin-icons/vaadin-icons';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-icons-only')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <iron-icon
        icon="vaadin:check-circle"
        theme="badge success pill"
        title="Confirmed"
        aria-label="Confirmed"
      ></iron-icon>
      <iron-icon
        icon="vaadin:close-circle"
        theme="badge error pill"
        title="Cancelled"
        aria-label="Cancelled"
      ></iron-icon>
      <!-- end::snippet[] -->
    `;
  }
}
