import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-integer-field';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-form-layout/vaadin-form-item';
import { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout/vaadin-form-layout';

const layoutSteps: FormLayoutResponsiveStep[] = [
  {
    minWidth: 0,
    columns: 1,
    labelsPosition: 'aside'
  }
];
import { applyTheme } from 'themes/theme-generated.js';

@customElement('number-field-stepper-controls')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-form-layout .responsiveSteps=${layoutSteps}>
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
