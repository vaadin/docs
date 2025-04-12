import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/form-layout';
import '@vaadin/upload';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import { applyTheme } from 'Frontend/generated/theme';
/* prettier-ignore */
import { createFakeFilesUploadErrorMessagesA, createFakeFilesUploadErrorMessagesB } from './upload-demo-mock-files'; // hidden-source-line

const layoutSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1, labelsPosition: 'top' },
  { minWidth: '540px', columns: 2, labelsPosition: 'top' },
];

@customElement('upload-error-messages')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  private cautionI18n = {
    uploading: {
      error: {
        unexpectedServerError: 'Unexpected Server Error',
      },
    },
  };

  // tag::snippet[]
  private recommendedI18n = {
    uploading: {
      error: {
        unexpectedServerError: "File couldn't be uploaded, try again later",
      },
    },
  };

  protected override render() {
    return html`
      <!-- end::snippet[] -->
      <vaadin-form-layout .responsiveSteps="${layoutSteps}">
        <div>
          <strong>Caution</strong>
          <vaadin-upload
            id="upload-caution"
            nodrop
            .i18n="${this.cautionI18n}"
            .files="${createFakeFilesUploadErrorMessagesA() /* hidden-source-line */}"
          ></vaadin-upload>
        </div>
        <div>
          <strong>Recommended</strong>
          <!-- tag::snippet[] -->
          <vaadin-upload
            id="upload-recommended"
            nodrop
            .i18n="${this.recommendedI18n}"
            .files="${createFakeFilesUploadErrorMessagesB() /* hidden-source-line */}"
          ></vaadin-upload>
          <!-- end::snippet[] -->
        </div>
      </vaadin-form-layout>
      <!-- tag::snippet[] -->
    `;
  }
  // end::snippet[]
}
