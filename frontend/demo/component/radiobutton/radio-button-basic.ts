import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';

@customElement('radio-button-basic')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[]-->
      <vaadin-radio-group label="Travel class" theme="vertical">
        <vaadin-radio-button value="economy">Economy</vaadin-radio-button>
        <vaadin-radio-button value="business">Business</vaadin-radio-button>
        <vaadin-radio-button value="firstClass">First Class</vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[]-->
    `;
  }
}
