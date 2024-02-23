import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/select';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('select-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  // tag::snippet[]
  private items = [
    {
      label: 'XS (out of stock)',
      value: 'xs',
      disabled: true,
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
  // end::snippet[]

  protected override render() {
    return html`
      <vaadin-select
        label="Size"
        .items="${this.items}"
        .value="${this.items[4].value}"
      ></vaadin-select>
    `;
  }
}
