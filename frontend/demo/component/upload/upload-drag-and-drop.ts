import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-upload/vaadin-upload';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import type { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout/vaadin-form-layout';
import { applyTheme } from 'Frontend/generated/theme';

const layoutSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1, labelsPosition: 'top' },
  { minWidth: '520px', columns: 2, labelsPosition: 'top' },
];

@customElement('upload-drag-and-drop')
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
        <div>
          <!-- tag::snippet[] -->
          <strong>Drag and drop enabled</strong>
          <vaadin-upload .nodrop="${false}"></vaadin-upload>
          <!-- end::snippet[] -->
        </div>
        <div>
          <!-- tag::snippet[] -->
          <strong>Drag and drop disabled</strong>
          <vaadin-upload nodrop></vaadin-upload>
          <!-- end::snippet[] -->
        </div>
      </vaadin-form-layout>
    `;
  }
}
