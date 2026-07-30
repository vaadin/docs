import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/switch';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Binder, field, Required } from '@vaadin/hilla-lit-form';
import { applyTheme } from 'Frontend/demo/theme';
import UserPermissionsModel from 'Frontend/generated/com/vaadin/demo/domain/UserPermissionsModel';

@customElement('switch-validation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  private binder = new Binder(this, UserPermissionsModel);

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: baseline">
        <!-- tag::snippet[] -->
        <vaadin-switch
          label="I confirm the details are correct"
          required
          error-message="You must confirm to continue"
          ${field(this.binder.model.view)}
        ></vaadin-switch>
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
