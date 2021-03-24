import '../../init'; // hidden-full-source-line
import './upload-demo-helpers'; // hidden-full-source-line
import { createFakeFilesUploadAllFiles } from './upload-demo-mock-files'; // hidden-full-source-line
import { internalProperty } from 'lit-element'; // hidden-full-source-line
import { customElement, html, LitElement, query } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadElement } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-all-files')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }
  @internalProperty() // hidden-full-source-line
  private files = createFakeFilesUploadAllFiles(); // hidden-full-source-line

  // tag::snippet[]
  @query('vaadin-upload')
  private upload?: UploadElement;

  // end::snippet[]
  firstUpdated() {
    if (this.upload?.i18n) {
      this.upload.i18n.addFiles.many = 'Select Files...';
      this.upload.i18n = { ...this.upload.i18n };
    }
  }

  // tag::snippet[]
  render() {
    return html`
      <!-- hidden-source-line --><!-- prettier-ignore -->
      <vaadin-upload
        no-auto
        .files=${this.files /* hidden-source-line */}
      ></vaadin-upload>
      <p>
        <vaadin-button theme="primary" @click="${this.uploadFiles}">
          Upload All Files
        </vaadin-button>
      </p>
    `;
  }

  uploadFiles() {
    this.upload?.uploadFiles();
  }
  // end::snippet[]
}
