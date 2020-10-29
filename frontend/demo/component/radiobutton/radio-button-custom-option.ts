import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

import cards from '../../../../src/main/resources/data/cards.json';
import * as visa from '../../../../src/main/resources/images/visa.png';
import * as mastercard from '../../../../src/main/resources/images/mastercard.png';
const IMAGES: { [key: string]: string } = {
  visa,
  mastercard
};

@customElement('radio-button-custom-option')
export class Example extends LitElement {
  @property()
  private value = 'visa';

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout>
        <vaadin-radio-group
          label="Payment method"
          theme="vertical"
          .value=${this.value}
          @value-changed=${(e: CustomEvent) => (this.value = e.detail.value)}
        >
          ${cards.map(
            (card) => html`
              <vaadin-radio-button value=${card.name}>
                <div style="display: flex">
                  <img src=${IMAGES[card.name]} alt=${card.name} style="height: 1em;" />
                  ${card.number}
                </div>
              </vaadin-radio-button>
            `
          )}
          <vaadin-radio-button value="other">Other</vaadin-radio-button>
        </vaadin-radio-group>

        <vaadin-text-field
          label="Card number"
          .hidden=${this.value !== 'other'}
        ></vaadin-text-field>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
