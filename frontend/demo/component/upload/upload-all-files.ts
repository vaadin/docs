import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import '@vaadin/upload';
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import type { Upload } from '@vaadin/upload';
import { applyTheme } from 'Frontend/generated/theme';
import { createFakeFilesUploadAllFiles } from './upload-demo-mock-files'; // hidden-source-line

@customElement('upload-all-files')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  private uploadI18n = {
    addFiles: {
      many: 'Select Files...',
    },
  };

  // tag::snippet[]
  @query('vaadin-upload')
  private upload!: Upload;

  protected override render() {
    return html`
      <vaadin-upload
        no-auto
        .i18n="${this.uploadI18n}"
        .files="${createFakeFilesUploadAllFiles() /* hidden-source-line */}"
      ></vaadin-upload>
      <vaadin-button theme="primary" @click="${this.uploadFiles}"> Upload All Files</vaadin-button>
    `;
  }

  uploadFiles() {
    this.upload?.uploadFiles();
  }
  // end::snippet[]
}
