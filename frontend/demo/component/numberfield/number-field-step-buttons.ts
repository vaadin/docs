import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/integer-field';
import '@vaadin/form-layout';
import '@vaadin/form-layout/vaadin-form-item.js';
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import { applyTheme } from 'Frontend/generated/theme';

const layoutSteps: FormLayoutResponsiveStep[] = [
  {
    minWidth: 0,
    columns: 1,
    labelsPosition: 'aside',
  },
];

@customElement('number-field-step-buttons')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-form-layout .responsiveSteps="${layoutSteps}">
        <vaadin-form-item>
          <label slot="label">Adults</label>
          <!-- tag::snippet[] -->
          <vaadin-integer-field
            value="2"
            step-buttons-visible
            min="0"
            max="9"
          ></vaadin-integer-field>
          <!-- end::snippet[] -->
        </vaadin-form-item>

        <vaadin-form-item>
          <label slot="label">
            <div>Children</div>
            <div style="font-size: var(--lumo-font-size-xxs); position: absolute;">Age 2-12</div>
          </label>
          <vaadin-integer-field
            value="2"
            step-buttons-visible
            min="0"
            max="9"
          ></vaadin-integer-field>
        </vaadin-form-item>

        <vaadin-form-item>
          <label slot="label">Infants</label>
          <vaadin-integer-field
            value="1"
            step-buttons-visible
            min="0"
            max="9"
          ></vaadin-integer-field>
        </vaadin-form-item>
      </vaadin-form-layout>
    `;
  }
}
