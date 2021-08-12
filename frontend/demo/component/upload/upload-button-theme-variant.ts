import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { showErrorNotification } from 'Frontend/demo/notification-helper';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-upload/vaadin-upload';
import type {
  UploadElement,
  UploadFileRejectEvent,
  UploadMaxFilesReachedChangedEvent,
} from '@vaadin/vaadin-upload/vaadin-upload';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-button-theme-variant')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('vaadin-upload')
  private upload?: UploadElement;

  @state()
  private maxFilesReached = false;

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
        @max-files-reached-changed="${(e: UploadMaxFilesReachedChangedEvent) =>
          (this.maxFilesReached = e.detail.value)}"
      >
        <vaadin-button slot="add-button" theme="primary" ?disabled="${this.maxFilesReached}">
          Upload PDF...
        </vaadin-button>
      </vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }

  fileRejectHandler(event: UploadFileRejectEvent) {
    showErrorNotification(`Error: ${event.detail.error} '${event.detail.file.name}'`);
  }
}
