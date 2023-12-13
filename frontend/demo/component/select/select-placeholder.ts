import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/select';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('select-placeholder')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items = [
    {
      label: 'XS',
      value: 'xs',
    },
    {
      label: 'S',
      value: 's',
    },
    {
      label: 'M',
      value: 'm',
    },
    {
      label: 'L',
      value: 'l',
    },
    {
      label: 'XL',
      value: 'xl',
    },
  ];

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-select label="Size" placeholder="Select size" .items="${this.items}"></vaadin-select>
      <!-- end::snippet[] -->
    `;
  }
}
