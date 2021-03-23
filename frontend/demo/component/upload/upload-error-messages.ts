import '../../init'; // hidden-full-source-line
import { createFakeUploadFiles } from './upload-demo-helpers'; // hidden-full-source-line
import { css, customElement, html, internalProperty, LitElement } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadResponse } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

function createFakeFilesA() {
  return createFakeUploadFiles([{ name: 'Financials.xlsx', error: 'Unexpected Server Error' }]);
}

function createFakeFilesB() {
  return createFakeUploadFiles([
    { name: 'Financials.xlsx', error: "File couldn't be uploaded, please try again" },
  ]);
}

@customElement('upload-error-messages')
export class Example extends LitElement {
  static get styles() {
    return css`
      .flex {
        display: flex;
        flex-wrap: wrap;
        margin: calc(-0.5 * var(--lumo-space-l));
      }

      .flex > div {
        margin: calc(0.5 * var(--lumo-space-l));
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

  @internalProperty()
  private filesA = createFakeFilesA();

  @internalProperty()
  private filesB = createFakeFilesB();

  fakeErrorResponse(event: UploadResponse) {
    // eslint-disable-line -- hidden-full-source-line
    (event.detail.xhr.status as any) = 500; // hidden-full-source-line
  } // hidden-full-source-line
  fakeErrorResponseWrapper(callback: (event: UploadResponse) => void) {
    // eslint-disable-line -- hidden-full-source-line
    return (event: UploadResponse) => {
      // eslint-disable-line -- hidden-full-source-line
      this.fakeErrorResponse(event); // hidden-full-source-line
      callback(event); // hidden-full-source-line
    }; // hidden-full-source-line
  } // hidden-full-source-line
  // tag::snippet[]
  render() {
    return html`
      <div class="flex">
        <div>
          <vaadin-upload
            nodrop
            .files=${this.filesA}
            .__dummy1=${'' /* end::snippet[] */}
            @upload-response="${this.fakeErrorResponse /* hidden-full-source-line */}"
            .__dummy2=${'' /* tag::snippet[] */}
          ></vaadin-upload>
          <p>Caution</p>
        </div>
        <div>
          <vaadin-upload
            nodrop
            .files=${this.filesB}
            @upload-response="${this.uploadResponseHandler}"
          ></vaadin-upload>
          <p>Do</p>
        </div>
      </div>
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
