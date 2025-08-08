import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/email-field';
import '@vaadin/form-layout';
import '@vaadin/form-layout/vaadin-form-item.js';
import '@vaadin/split-layout';
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('form-layout-steps-labels-aside')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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

  // tag::snippet[]
  // This is the default configuration shown for demonstration purposes
  // private responsiveSteps: FormLayoutResponsiveStep[] = [
  //   { minWidth: 0, columns: 1, labelsPosition: 'top' },
  //   { minWidth: '20em', columns: 1 },
  //   { minWidth: '40em', columns: 2 },
  // ];

  // end::snippet[]
  // tag::snippet[]
  private renderFormLayout() {
    return html`
      <vaadin-form-layout style="--vaadin-form-item-label-width: 92px;">
        <!-- Wrap fields into form items, which
             displays labels on the side by default -->
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
  }
  // end::snippet[]
}
