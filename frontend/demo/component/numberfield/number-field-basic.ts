import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/form-layout';
import '@vaadin/number-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('number-field-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-form-layout auto-responsive auto-rows>
        <!-- tag::snippet[] -->
        <vaadin-number-field label="Balance" value="200">
          <div slot="prefix">$</div>
        </vaadin-number-field>

        <vaadin-number-field label="Balance" value="200">
          <div slot="suffix">€</div>
        </vaadin-number-field>
        <!-- end::snippet[] -->
      </vaadin-form-layout>
    `;
  }
}
