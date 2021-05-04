import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('combo-box-custom-entry-2')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items = ['Chrome', 'Edge', 'Firefox', 'Safari'];

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-combo-box
        allow-custom-value
        @custom-value-set="${(e: CustomEvent) => (this.items = [...this.items, e.detail])}"
        label="Browser"
        helper-text="Select or type a browser"
        .items="${this.items}"
      ></vaadin-combo-box>
      <!-- end::snippet[] -->
    `;
  }
}
