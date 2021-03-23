import '../../init'; // hidden-full-source-line
import { fakeErrorResponse, fakeErrorResponseWrapper } from './upload-demo-helpers'; // hidden-full-source-line
/* prettier-ignore */ import { createFakeFilesUploadErrorMessagesA, createFakeFilesUploadErrorMessagesB } from './upload-demo-mock-files'; // hidden-full-source-line
import { internalProperty } from 'lit-element'; // hidden-full-source-line
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
    this.uploadResponseHandler = fakeErrorResponseWrapper(this.uploadResponseHandler); // hidden-full-source-line
  }
  @internalProperty() // hidden-full-source-line
  private filesA = createFakeFilesUploadErrorMessagesA(); // hidden-full-source-line
  @internalProperty() // hidden-full-source-line
  private filesB = createFakeFilesUploadErrorMessagesB(); // hidden-full-source-line

  // tag::snippet[]
  render() {
    return html`
      <div class="flex">
        <div>
          <vaadin-upload
            nodrop
            .__dummy1=${'' /* end::snippet[] */}
            .files=${this.filesA /* hidden-full-source-line */}
            @upload-response="${fakeErrorResponse /* hidden-full-source-line */}"
            .__dummy2=${'' /* tag::snippet[] */}
          ></vaadin-upload>
          <p>Caution</p>
        </div>
        <div>
          <vaadin-upload
            nodrop
            @upload-response="${this.uploadResponseHandler}"
            .__dummy1=${'' /* end::snippet[] */}
            .files=${this.filesB /* hidden-full-source-line */}
            .__dummy2=${'' /* tag::snippet[] */}
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
