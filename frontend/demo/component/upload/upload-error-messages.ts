import 'Frontend/demo/init'; // hidden-source-line
/* prettier-ignore */ import {createFakeFilesUploadErrorMessagesA, createFakeFilesUploadErrorMessagesB} from './upload-demo-mock-files'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/form-layout';
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import '@vaadin/upload';
import type { Upload } from '@vaadin/upload';
import { applyTheme } from 'Frontend/generated/theme';

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

  @query('#upload-caution')
  private accessor uploadCaution!: Upload;

  @query('#upload-recommended')
  private accessor uploadRecommended!: Upload;

  // tag::snippet[]
  protected override firstUpdated() {
    // end::snippet[]
    this.uploadCaution.setupMockErrorResponse(); // hidden-source-line
    this.uploadRecommended.setupMockErrorResponse(); // hidden-source-line
    this.uploadCaution.i18n.uploading.error.unexpectedServerError = 'Unexpected Server Error';
    this.uploadCaution.i18n = { ...this.uploadCaution.i18n };
    // tag::snippet[]
    this.uploadRecommended.i18n.uploading.error.unexpectedServerError =
      "File couldn't be uploaded, try again later";
    this.uploadRecommended.i18n = { ...this.uploadRecommended.i18n };
  }

  protected override render() {
    return html`
      <!-- end::snippet[] -->
      <vaadin-form-layout .responsiveSteps="${layoutSteps}">
        <div>
          <strong>Caution</strong>
          <vaadin-upload
            id="upload-caution"
            nodrop
            .files="${createFakeFilesUploadErrorMessagesA() /* hidden-source-line */}"
          ></vaadin-upload>
        </div>
        <div>
          <strong>Recommended</strong>
          <!-- tag::snippet[] -->
          <vaadin-upload
            id="upload-recommended"
            nodrop
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
