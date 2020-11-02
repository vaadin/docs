import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { getCards } from '../../domain/DataService';
import { Card } from '../../domain/Card';

@customElement('radio-button-custom-option')
export class Example extends LitElement {
  @property()
  private value?: string;

  @property({ type: Array })
  private items: Card[] = [];

  async firstUpdated() {
    this.items = await getCards();
    this.value = this.items[0].id;
  }

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
          ${this.items.map(
            (card) => html`
              <vaadin-radio-button .value=${card.id}>
                <div style="display: flex">
                  <img src=${card.pictureUrl} alt=${card.name} style="height: 1em;" />
                  ${card.number}
                </div>
              </vaadin-radio-button>
            `
          )}
          <vaadin-radio-button value="-1">Other</vaadin-radio-button>
        </vaadin-radio-group>

        <vaadin-text-field label="Card number" .hidden=${this.value !== '-1'}></vaadin-text-field>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
