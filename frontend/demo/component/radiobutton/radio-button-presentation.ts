import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';

import * as visa from '../../../../src/main/resources/META-INF/resources/vaadin/images/visa.png';
import * as mastercard from '../../../../src/main/resources/META-INF/resources/vaadin/images/mastercard.png';
import cards from '../../../../src/main/resources/data/cards.json';
const IMAGES: { [key: string]: string } = {
  visa,
  mastercard
};

@customElement('radio-button-presentation')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[]-->
      <vaadin-radio-group label="Payment method" theme="vertical">
        ${cards.map(
          (card) => html`
            <vaadin-radio-button value="economy">
              <div>
                <div style="display: flex">
                  <img src=${IMAGES[card.name]} alt=${card.name} style="height: 1em;" />
                  ${card.number}
                </div>
                <div>Expiry date:${card.expiryDate}</div>
              </div>
            </vaadin-radio-button>
          `
        )}
      </vaadin-radio-group>
      <!-- end::snippet[]-->
    `;
  }
}
