import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/text-field';
import '@vaadin/form-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('text-field-readonly-and-disabled')
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
        <vaadin-text-field readonly label="Read-only" value="Value"></vaadin-text-field>

        <vaadin-text-field disabled label="Disabled"></vaadin-text-field>
        <!-- end::snippet[] -->
      </vaadin-form-layout>
    `;
  }
}
