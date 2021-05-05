import '../../init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { customElement, html, LitElement, query } from 'lit-element';
import { showErrorNotification } from 'Frontend/demo/notification-helper';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadElement, UploadFileReject } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-labelling')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @query('vaadin-upload')
  private upload?: UploadElement;

  // tag::snippet[]
  firstUpdated() {
    if (this.upload?.i18n) {
      this.upload.i18n.addFiles.one = 'Upload PDF...';
      this.upload.i18n.dropFiles.one = 'Drop PDF here';
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

  fileRejectHandler(event: UploadFileReject) {
    showErrorNotification(`Error: ${event.detail.error} '${event.detail.file.name}'`);
  }
}
