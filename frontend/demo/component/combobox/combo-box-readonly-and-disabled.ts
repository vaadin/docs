import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/combo-box';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('combo-box-readonly-and-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-combo-box readonly label="Read-only" .items="${['Value']}" value="Value">
        </vaadin-combo-box>

        <vaadin-combo-box disabled label="Disabled"></vaadin-combo-box>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
