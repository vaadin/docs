import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
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

@customElement('text-field-text-alignment')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-form-layout .responsiveSteps=${layoutSteps}>
        <vaadin-form-item>
          <label slot="label">Revenue</label>
          <!-- tag::snippet[] -->
          <vaadin-text-field value="8800" theme="align-right"></vaadin-text-field>
          <!-- end::snippet[] -->
        </vaadin-form-item>

        <vaadin-form-item>
          <label slot="label">
            <div>Deduction</div>
          </label>
          <vaadin-text-field value="500" theme="align-right"></vaadin-text-field>
        </vaadin-form-item>

        <vaadin-form-item>
          <label slot="label">Other</label>
          <vaadin-text-field value="1000" theme="align-right"></vaadin-text-field>
        </vaadin-form-item>
      </vaadin-form-layout>
    `;
  }
}
