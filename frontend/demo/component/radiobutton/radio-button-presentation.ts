import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import { getCards } from '../../domain/DataService';
import Card from '../../../generated/com/vaadin/demo/domain/Card';

@customElement('radio-button-presentation')
export class Example extends LitElement {
  @property()
  private value?: string;

  @property({ type: Array })
  private items: Card[] = [];

  async firstUpdated() {
    this.items = await getCards();
    this.value = String(this.items[0].id);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-radio-group label="Payment method" theme="vertical" .value=${this.value}>
        ${this.items.map(
          (card) => html`
            <vaadin-radio-button .value=${String(card.id)}>
              <div>
                <div style="display: flex">
                  <img src=${card.pictureUrl} alt=${card.name} style="height: 1em;" />
                  ${card.accountNumber}
                </div>
                <div>Expiry date:${card.expiryDate}</div>
              </div>
            </vaadin-radio-button>
          `
        )}
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
