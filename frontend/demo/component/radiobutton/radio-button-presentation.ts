import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';

@customElement('radio-button-presentation')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[]-->
      <vaadin-radio-group label="Travel Class" theme="vertical">
        <vaadin-radio-button value="economy" checked>
          <b>Broek</b>
          <br />
          Aarhus, Denmark
        </vaadin-radio-button>
        <vaadin-radio-button value="business">
          <b>Akuchi</b>
          <br />
          Cologne, Germany
        </vaadin-radio-button>
        <vaadin-radio-button value="firstClass">
          <b>Wulf</b>
          <br />
          Dhaka, Bangladesh
        </vaadin-radio-button>
        <vaadin-radio-button value="firstClass">
          <b>Sana</b>
          <br />
          Osaka, Japan
        </vaadin-radio-button>
        <vaadin-radio-button value="firstClass">
          <b>Oikonomou</b>
          <br />
          Athens, Greece
        </vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[]-->
    `;
  }
}
