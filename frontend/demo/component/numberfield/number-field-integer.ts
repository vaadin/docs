import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/form-layout';
import '@vaadin/integer-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('number-field-integer')
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
        <vaadin-integer-field label="X" value="-1284"></vaadin-integer-field>

        <vaadin-integer-field label="Y" value="3910"></vaadin-integer-field>
        <!-- end::snippet[] -->
      </vaadin-form-layout>
    `;
  }
}
