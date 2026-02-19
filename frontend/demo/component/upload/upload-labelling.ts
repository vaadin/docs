import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import '@vaadin/upload';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';
import type { UploadFileRejectEvent } from '@vaadin/upload';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('upload-labelling')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  private uploadI18n = {
    addFiles: { one: 'Upload Report...' },
    dropFiles: { one: 'Drop report here' },
    error: {
      incorrectFileType: 'The provided file does not have the correct format (PDF document).',
    },
  };

  protected override render() {
    return html`
      <vaadin-upload
        max-files="1"
        accept="application/pdf,.pdf"
        .i18n="${this.uploadI18n}"
        @file-reject="${this.fileRejectHandler}"
      ></vaadin-upload>
    `;
  }
  // end::snippet[]

  fileRejectHandler(event: UploadFileRejectEvent) {
    Notification.show(event.detail.error);
  }
}
