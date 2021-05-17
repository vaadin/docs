import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { getCards } from 'Frontend/demo/domain/DataService';
import Card from 'Frontend/generated/com/vaadin/demo/domain/Card';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-presentation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @state()
  private value?: string;

  @state()
  private items: Card[] = [];

  async firstUpdated() {
    this.items = await getCards();
    this.value = String(this.items[0].id);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-radio-group label="Payment method" theme="vertical" .value="${this.value}">
        ${this.items.map(
          (card) => html`
            <vaadin-radio-button .value="${String(card.id)}">
              <div>
                <vaadin-horizontal-layout theme="spacing">
                  <img src="${card.pictureUrl}" alt="${card.name}" style="height: 1em;" />
                  <span>${card.accountNumber}</span>
                </vaadin-horizontal-layout>
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
