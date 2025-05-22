import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import '@vaadin/upload';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';
import type { UploadFileRejectEvent } from '@vaadin/upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-file-format')
export class Example extends LitElement {
  static override styles = css`
    h4 {
      margin-top: 0;
    }

    p {
      color: var(--lumo-secondary-text-color);
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  private uploadI18n = {
    addFiles: { one: 'Upload Report...' },
    dropFiles: { one: 'Drop report here' },
    error: {
      incorrectFileType: 'The provided file does not have the correct format (PDF document).',
    },
  };

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <h4>Upload report</h4>
      <p>Accepted file formats: PDF (.pdf)</p>
      <vaadin-upload
        accept="application/pdf,.pdf"
        max-files="1"
        .i18n="${this.uploadI18n}"
        @file-reject="${(event: UploadFileRejectEvent) => {
          Notification.show(event.detail.error);
        }}"
      ></vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }
}
