import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/text-area';
import '@vaadin/form-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('text-area-readonly-and-disabled')
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
        <vaadin-text-area readonly label="Read-only" value="Value"></vaadin-text-area>

        <vaadin-text-area disabled label="Disabled"></vaadin-text-area>
        <!-- end::snippet[] -->
      </vaadin-form-layout>
    `;
  }
}
