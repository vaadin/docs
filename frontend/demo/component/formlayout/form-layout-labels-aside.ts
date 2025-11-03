import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/form-layout';
import '@vaadin/form-layout/vaadin-form-item.js';
import '@vaadin/text-field';
import '@vaadin/email-field';
import '@vaadin/split-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('form-layout-labels-aside')
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
      <vaadin-form-layout class="w-full" auto-responsive labels-aside>
        <vaadin-form-item>
          <label slot="label">First name</label>
          <vaadin-text-field></vaadin-text-field>
        </vaadin-form-item>
        <vaadin-form-item>
          <label slot="label">Last name</label>
          <vaadin-text-field></vaadin-text-field>
        </vaadin-form-item>
        <vaadin-form-item>
          <label slot="label">Email address</label>
          <vaadin-email-field></vaadin-email-field>
        </vaadin-form-item>
      </vaadin-form-layout>
    `;
    // end::snippet[]
  }
}
