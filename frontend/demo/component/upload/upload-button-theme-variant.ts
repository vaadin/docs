import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/upload';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';
import type { UploadFileRejectEvent, UploadMaxFilesReachedChangedEvent } from '@vaadin/upload';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('upload-button-theme-variant')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private maxFilesReached = false;

  private uploadI18n = {
    dropFiles: {
      one: 'Drop PDF here',
    },
  };

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-upload
        max-files="1"
        accept="application/pdf,.pdf"
        .i18n="${this.uploadI18n}"
        @file-reject="${this.fileRejectHandler}"
        @max-files-reached-changed="${(event: UploadMaxFilesReachedChangedEvent) => {
          this.maxFilesReached = event.detail.value;
        }}"
      >
        <vaadin-button slot="add-button" theme="primary" ?disabled="${this.maxFilesReached}">
          Upload PDF...
        </vaadin-button>
      </vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }

  fileRejectHandler(event: UploadFileRejectEvent) {
    Notification.show(`Error: ${event.detail.error} '${event.detail.file.name}'`);
  }
}
