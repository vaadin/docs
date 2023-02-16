import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/form-layout';
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import '@vaadin/upload';
import { applyTheme } from 'Frontend/generated/theme';

const layoutSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1, labelsPosition: 'top' },
  { minWidth: '520px', columns: 2, labelsPosition: 'top' },
];

@customElement('upload-drag-and-drop')
export class Example extends LitElement {
  static override styles = css`
    label {
      font-weight: 600;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-form-layout .responsiveSteps="${layoutSteps}">
        <div>
          <!-- tag::snippet[] -->
          <label for="upload-drop-enabled">Drag and drop enabled</label>
          <vaadin-upload id="upload-drop-enabled" .nodrop="${false}"></vaadin-upload>
          <!-- end::snippet[] -->
        </div>
        <div>
          <!-- tag::snippet[] -->
          <label for="upload-drop-disabled">Drag and drop disabled</label>
          <vaadin-upload id="upload-drop-disabled" nodrop></vaadin-upload>
          <!-- end::snippet[] -->
        </div>
      </vaadin-form-layout>
    `;
  }
}
