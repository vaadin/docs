import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/item';
import '@vaadin/list-box';
import '@vaadin/select';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('select-dividers')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  // tag::snippet[]
  private items = [
    {
      label: 'Most recent first',
      value: 'recent',
    },
    {
      compoent: 'hr',
    },
    {
      label: 'Rating: high to low',
      value: 'rating-desc',
    },
    {
      label: 'Rating: low to high',
      value: 'rating-asc',
    },
    {
      compoent: 'hr',
    },
    {
      label: 'Price: high to low',
      value: 'price-desc',
    },
    {
      label: 'Price: low to high',
      value: 'price-asc',
    },
  ];
  // end::snippet[]

  render() {
    return html`
      <vaadin-select
        label="Sort by"
        .items="${this.items}"
        .value="${this.items[0].value!}"
      ></vaadin-select>
    `;
  }
}
