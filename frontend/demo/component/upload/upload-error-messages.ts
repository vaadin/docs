import '../../init'; // hidden-full-source-line
import { createFakeUploadFiles } from './upload-demo-helpers'; // hidden-full-source-line
// hidden-full-source-line
import { css, customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadResponse } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-error-messages')
export class Example extends LitElement {
  static get styles() {
    return css`
      .flex {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        margin: calc(-1 * var(--lumo-space-m));
      }

      .flex > div {
        margin: var(--lumo-space-m);
        display: flex;
        flex: 1 1 15rem;
        flex-direction: column;
        justify-content: space-between;
      }
    `;
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
    this.uploadResponseHandler = this.fakeErrorResponseWrapper(this.uploadResponseHandler); // hidden-full-source-line
  }

  firstUpdated() {
    this.setFakeStatus();
    const uploads = this.shadowRoot!.querySelectorAll('vaadin-upload'); // hidden-full-source-line
    uploads[0].addEventListener('upload-response', this.fakeErrorResponse); // hidden-full-source-line
  }
  /* eslint-disable ------------------------------------------------------ hidden-full-source-line */
  fakeErrorResponse(event: UploadResponse) {
    // hidden-full-source-line
    (event.detail.xhr.status as any) = 500; // hidden-full-source-line
  } // hidden-full-source-line
  // hidden-full-source-line
  fakeErrorResponseWrapper(callback: (event: UploadResponse) => void) {
    // hidden-full-source-line
    return (event: UploadResponse) => {
      // hidden-full-source-line
      this.fakeErrorResponse(event); // hidden-full-source-line
      callback(event); // hidden-full-source-line
    }; // hidden-full-source-line
  } // hidden-full-source-line
  /* eslint-enable ------------------------------------------------------- hidden-full-source-line */

  setFakeStatus() {
    const uploads = this.shadowRoot!.querySelectorAll('vaadin-upload');
    uploads[0].files = createFakeUploadFiles([
      { name: 'Financials.xlsx', error: uploads[0].i18n.uploading.error.unexpectedServerError },
    ]);
    uploads[1].files = createFakeUploadFiles([
      { name: 'Financials.xlsx', error: "File couldn't be uploaded, please try again" },
    ]);
  }

  // tag::snippet[]
  render() {
    return html`
      <div class="flex">
        <div>
          <vaadin-upload nodrop></vaadin-upload>
          <p>Caution</p>
        </div>
        <div>
          <vaadin-upload nodrop @upload-response="${this.uploadResponseHandler}"></vaadin-upload>
          <p>Do</p>
        </div>
      </div>
      <!-- end::snippet[] -->
      <div style="text-align: center; margin-top: var(--lumo-space-l)">
        <vaadin-button @click="${this.setFakeStatus}">Reset demo</vaadin-button>
      </div>
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
