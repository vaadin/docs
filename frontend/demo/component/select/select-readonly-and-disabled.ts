import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/select';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('select-readonly-and-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-select
          readonly
          label="Read-only"
          value="${this.items[0].value}"
          .items="${this.items}"
        ></vaadin-select>

        <vaadin-select disabled label="Disabled"></vaadin-select>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }

  @state()
  private items = [
    {
      label: 'Most recent first',
      value: 'recent',
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
      label: 'Price: high to low',
      value: 'price-desc',
    },
    {
      label: 'Price: low to high',
      value: 'price-asc',
    },
  ];
}
