import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/select';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('select-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
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
