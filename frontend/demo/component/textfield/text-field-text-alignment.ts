import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/text-field';
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

@customElement('text-field-text-alignment')
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
