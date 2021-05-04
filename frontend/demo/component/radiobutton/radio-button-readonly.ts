import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-readonly')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-radio-group label="Status" readonly>
        <vaadin-radio-button value="inProgress" checked>In progress</vaadin-radio-button>
        <vaadin-radio-button value="done">Done</vaadin-radio-button>
        <vaadin-radio-button value="cancelled">Cancelled</vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
