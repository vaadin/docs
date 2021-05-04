import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { getCards } from 'Frontend/demo/domain/DataService';
import Card from 'Frontend/generated/com/vaadin/demo/domain/Card';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-custom-option')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private value?: string;

  @internalProperty()
  private items: Card[] = [];

  async firstUpdated() {
    this.items = await getCards();
    this.value = String(this.items[0].id);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout>
        <vaadin-radio-group
          label="Payment method"
          theme="vertical"
          .value="${this.value}"
          @value-changed="${(e: CustomEvent) => (this.value = e.detail.value)}"
        >
          ${this.items.map(
            (card) => html`
              <vaadin-radio-button .value="${String(card.id)}">
                <vaadin-horizontal-layout theme="spacing">
                  <img src="${card.pictureUrl}" alt="${card.name}" style="height: 1em;" />
                  <span>${card.accountNumber}</span>
                </vaadin-horizontal-layout>
              </vaadin-radio-button>
            `
          )}
          <vaadin-radio-button value="-1">Other</vaadin-radio-button>
        </vaadin-radio-group>

        <vaadin-text-field label="Card number" .hidden="${this.value !== '-1'}"></vaadin-text-field>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
