import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/form-layout';
import '@vaadin/number-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('number-field-readonly-and-disabled')
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
        <vaadin-number-field readonly label="Read-only" value="200"></vaadin-number-field>

        <vaadin-number-field disabled label="Disabled"></vaadin-number-field>
        <!-- end::snippet[] -->
      </vaadin-form-layout>
    `;
  }
}
