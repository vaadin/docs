import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/checkbox';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Binder, field, Required } from '@vaadin/hilla-lit-form';
import UserPermissionsModel from 'Frontend/generated/com/vaadin/demo/domain/UserPermissionsModel';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-required')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  private binder = new Binder(this, UserPermissionsModel);

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: baseline">
        <!-- tag::snippet[] -->
        <vaadin-checkbox
          label="Grant view permissions"
          required
          error-message="This field is required"
          ${field(this.binder.model.view)}
        ></vaadin-checkbox>
        <!-- end::snippet[] -->
        <vaadin-button @click="${this.validate}">Submit</vaadin-button>
      </vaadin-horizontal-layout>
    `;
  }

  protected override firstUpdated() {
    this.binder.for(this.binder.model.view).addValidator(new Required());
  }

  protected validate() {
    this.binder.validate();
  }
}
