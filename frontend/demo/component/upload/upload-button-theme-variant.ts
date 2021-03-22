import '../../init'; // hidden-full-source-line
import './upload-demo-helpers'; // hidden-full-source-line
// hidden-full-source-line
import { customElement, html, LitElement, query } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadElement, UploadFileReject } from '@vaadin/vaadin-upload/vaadin-upload';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-button-theme-variant')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @query('vaadin-upload')
  private upload?: UploadElement;

  firstUpdated() {
    if (this.upload?.i18n) {
      this.upload.i18n.dropFiles.one = 'Drop PDF here';
      this.upload.i18n = { ...this.upload.i18n };
    }
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-upload
        max-files="1"
        accept="application/pdf,.pdf"
        @file-reject="${this.fileRejectHandler}"
      >
        <vaadin-button slot="add-button" theme="primary">Upload PDF...</vaadin-button>
      </vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }

  fileRejectHandler(event: UploadFileReject) {
    window.alert(event.detail.file.name + ' error: ' + event.detail.error);
  }
}
