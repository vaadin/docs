import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, state } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { applyTheme } from 'Frontend/generated/theme';
import countries from '../../../../src/main/resources/data/countries.json';

interface Country {
  readonly name: string;
  readonly abbreviation: string;
  readonly id: string;
}

@customElement('combo-box-filtering-1')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Country[] = countries;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-combo-box
        label="Country"
        item-label-path="name"
        item-value-path="id"
        .items="${this.items}"
      ></vaadin-combo-box>
      <!-- end::snippet[] -->
    `;
  }
}
