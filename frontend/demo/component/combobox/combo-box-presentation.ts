import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import country from '../../../data/countries.json';

// tag::snippet[]
@customElement('combo-box-presentation')
export class Example extends LitElement {
  @property() items = country;

  render() {
    return html`
      <vaadin-combo-box
        label="Choose doctor"
        item-label-path="country"
        item-value-path="id"
        .items=${this.items}
        style="width:100%"
      >
        <template>
          <style>
            :host {
              --vaadin-combo-box-overlay-width: 400px;
            }
            .avatar {
              width: 40px;
              border-radius: 100%;
              float: left;
              margin-right: 10px;
            }
          </style>
          <img src="https://randomuser.me/api/portraits/women/43.jpg" class="avatar" />
          <b>[[item.country]]</b>
          <br />
          [[item.abbreviation]]
        </template>
      </vaadin-combo-box>
    `;
  }
}
// end::snippet[]
