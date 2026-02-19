import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/multi-select-combo-box';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('multi-select-combo-box-item-class-name')
export class Example extends LitElement {
  static override styles = css`
    vaadin-multi-select-combo-box {
      width: 300px;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items = ['Apple', 'Banana', 'Orange', 'Pear'];

  protected override render() {
    return html`
      <vaadin-multi-select-combo-box
        label="Fruit"
        .items="${this.items}"
        .selectedItems="${this.items.slice(0, 2)}"
        .itemClassNameGenerator="${this.classNameGenerator}"
      ></vaadin-multi-select-combo-box>
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
