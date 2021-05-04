import '../../init'; // hidden-source-line
import { fakeErrorResponse, fakeErrorResponseWrapper } from './upload-demo-helpers'; // hidden-source-line
/* prettier-ignore */ import { createFakeFilesUploadErrorMessagesA, createFakeFilesUploadErrorMessagesB } from './upload-demo-mock-files'; // hidden-source-line
import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadResponse } from '@vaadin/vaadin-upload/vaadin-upload';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import type { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout/vaadin-form-layout';
import { applyTheme } from 'Frontend/generated/theme';

const layoutSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1, labelsPosition: 'top' },
  { minWidth: '540px', columns: 2, labelsPosition: 'top' },
];

@customElement('upload-error-messages')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
    this.uploadResponseHandler = fakeErrorResponseWrapper(this.uploadResponseHandler); // hidden-source-line
  }

  // tag::snippet[]
  render() {
    return html`
      <!-- end::snippet[] -->
      <vaadin-form-layout .responsiveSteps="${layoutSteps}">
        <div>
          <strong>Caution</strong>
          <vaadin-upload
            nodrop
            .files="${createFakeFilesUploadErrorMessagesA() /* hidden-source-line */}"
            @upload-response="${fakeErrorResponse /* hidden-source-line */}"
          ></vaadin-upload>
        </div>
        <div>
          <strong>Do</strong>
          <!-- tag::snippet[] -->
          <vaadin-upload
            nodrop
            @upload-response="${this.uploadResponseHandler}"
            .files="${createFakeFilesUploadErrorMessagesB() /* hidden-source-line */}"
          ></vaadin-upload>
          <!-- end::snippet[] -->
        </div>
      </vaadin-form-layout>
      <!-- tag::snippet[] -->
    `;
  }

  uploadResponseHandler(event: UploadResponse) {
    const { file, xhr } = event.detail;
    if (xhr.status >= 500) {
      // You can use any information available in the xhr object about the
      // server response for determining what to show in the error message.
      file.error = "File couldn't be uploaded, please try again";
      // Interpret the response as a success so that the custom error message
      // is shown
      (xhr.status as any) = 200;
    }
  }
  // end::snippet[]
}
