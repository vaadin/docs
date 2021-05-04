import '../../init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { createFakeFilesUploadAllFiles } from './upload-demo-mock-files'; // hidden-source-line
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
      <vaadin-upload
        no-auto
        .files="${createFakeFilesUploadAllFiles() /* hidden-source-line */}"
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
