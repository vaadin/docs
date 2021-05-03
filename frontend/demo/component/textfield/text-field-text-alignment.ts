import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
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

@customElement('text-field-text-alignment')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-form-layout .responsiveSteps="${layoutSteps}">
        <vaadin-form-item>
          <label slot="label">Left</label>
          <vaadin-text-field value="value"></vaadin-text-field>
        </vaadin-form-item>

        <vaadin-form-item>
          <label slot="label">Center</label>
          <vaadin-text-field value="value" theme="align-center"></vaadin-text-field>
        </vaadin-form-item>

        <vaadin-form-item>
          <label slot="label">Right</label>
          <!-- tag::snippet[] -->
          <vaadin-text-field value="value" theme="align-right"></vaadin-text-field>
          <!-- end::snippet[] -->
        </vaadin-form-item>
      </vaadin-form-layout>
    `;
  }
}
