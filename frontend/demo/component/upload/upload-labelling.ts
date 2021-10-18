import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';
import '@vaadin/upload';
import type { Upload, UploadFileRejectEvent } from '@vaadin/upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-labelling')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('vaadin-upload')
  private upload?: Upload;

  // tag::snippet[]
  firstUpdated() {
    if (this.upload?.i18n) {
      this.upload.i18n.addFiles.one = 'Upload PDF...';
      this.upload.i18n.dropFiles.one = 'Drop PDF here';
      this.upload.i18n.error.incorrectFileType =
        'The provided file does not have the correct format. Please provide a PDF document.';
      this.upload.i18n = { ...this.upload.i18n };
    }
  }

  render() {
    return html`
      <vaadin-upload
        max-files="1"
        accept="application/pdf,.pdf"
        @file-reject="${this.fileRejectHandler}"
      ></vaadin-upload>
    `;
  }
  // end::snippet[]

  fileRejectHandler(event: UploadFileRejectEvent) {
    Notification.show(event.detail.error);
  }
}
