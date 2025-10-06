import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/form-layout';
import '@vaadin/form-layout/vaadin-form-row.js';
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('form-layout-colspan')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-split-layout>
        ${this.renderFormLayout()}
        <div></div>
      </vaadin-split-layout>
    `;
  }

  private renderFormLayout() {
    // tag::snippet[]
    return html`
      <vaadin-form-layout class="w-full" auto-responsive column-width="8em" expand-fields>
        <vaadin-form-row>
          <vaadin-text-field label="Street address" data-colspan="3"></vaadin-text-field>
        </vaadin-form-row>
        <vaadin-form-row>
          <vaadin-text-field label="Postal code"></vaadin-text-field>
          <vaadin-text-field label="City/Town" data-colspan="2"></vaadin-text-field>
        </vaadin-form-row>
        <vaadin-form-row>
          <vaadin-text-field label="Country" data-colspan="2"></vaadin-text-field>
        </vaadin-form-row>
      </vaadin-form-layout>
    `;
    // end::snippet[]
  }
}
