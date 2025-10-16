import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/combo-box';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('combo-box-item-class-name')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items = ['Apple', 'Banana', 'Orange', 'Pear'];

  // tag::snippet[]
  protected override render() {
    return html`
      <vaadin-combo-box
        label="Fruit"
        .items="${this.items}"
        .itemClassNameGenerator="${this.classNameGenerator}"
      ></vaadin-combo-box>
    `;
  }

  protected classNameGenerator(item: string): string {
    switch (item) {
      case 'Apple':
        return 'coral';
      case 'Banana':
        return 'gold';
      case 'Orange':
        return 'orange';
      case 'Pear':
        return 'yellowgreen';
      default:
        return '';
    }
  }
  // end::snippet[]
}
