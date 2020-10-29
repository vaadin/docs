import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';

@customElement('radio-button-default-value')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-radio-group label="Repeat" theme="vertical">
        <vaadin-radio-button value="none" checked>None</vaadin-radio-button>
        <vaadin-radio-button value="daily">Daily</vaadin-radio-button>
        <vaadin-radio-button value="weekly">Weekly</vaadin-radio-button>
        <vaadin-radio-button value="monthly">Monthly</vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
