import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-text-field/vaadin-integer-field';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-form-layout/vaadin-form-item';
import { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout/vaadin-form-layout';

const layoutSteps: FormLayoutResponsiveStep[] = [
  {
    minWidth: 0,
    columns: 1,
    labelsPosition: 'aside',
  },
];
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-stepper-controls')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <vaadin-form-layout .responsiveSteps="${layoutSteps}">
        <vaadin-form-item>
          <label slot="label">Adults</label>
          <!-- tag::snippet[] -->
          <vaadin-integer-field value="2" has-controls min="0" max="9"></vaadin-integer-field>
          <!-- end::snippet[] -->
        </vaadin-form-item>

        <vaadin-form-item>
          <label slot="label">
            <div>Children</div>
            <div style="font-size: var(--lumo-font-size-xxs); position: absolute;">Age 2-12</div>
          </label>
          <vaadin-integer-field value="2" has-controls min="0" max="9"></vaadin-integer-field>
        </vaadin-form-item>

        <vaadin-form-item>
          <label slot="label">Infants</label>
          <vaadin-integer-field value="1" has-controls min="0" max="9"></vaadin-integer-field>
        </vaadin-form-item>
      </vaadin-form-layout>
    `;
  }
}
