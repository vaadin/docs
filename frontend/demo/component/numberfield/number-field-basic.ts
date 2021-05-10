import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-number-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-number-field label="Balance" value="200">
          <div slot="prefix">$</div>
        </vaadin-number-field>

        <vaadin-number-field label="Balance" value="200">
          <div slot="suffix">€</div>
        </vaadin-number-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
