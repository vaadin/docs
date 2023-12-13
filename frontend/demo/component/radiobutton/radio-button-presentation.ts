import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/radio-group';
import { getCards } from 'Frontend/demo/domain/DataService';
import type Card from 'Frontend/generated/com/vaadin/demo/domain/Card';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-presentation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private value: string | undefined;

  @state()
  private items: Card[] = [];

  protected override async firstUpdated() {
    this.items = await getCards();
    this.value = String(this.items[0].id);
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-radio-group label="Payment method" theme="vertical" .value="${this.value}">
        ${this.items.map(
          (card) => html`
            <vaadin-radio-button .value="${String(card.id)}">
              <label slot="label">
                <vaadin-horizontal-layout theme="spacing">
                  <img src="${card.pictureUrl}" alt="${card.name}" style="height: 1em;" />
                  <span>${card.accountNumber}</span>
                </vaadin-horizontal-layout>
                <div>Expiry date:${card.expiryDate}</div>
              </label>
            </vaadin-radio-button>
          `
        )}
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
