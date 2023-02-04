import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';
import '@vaadin/upload';
import type { Upload, UploadFileRejectEvent } from '@vaadin/upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-file-size')
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

  @query('vaadin-upload')
  private upload!: Upload;

  protected override firstUpdated() {
    this.upload.i18n.error.fileIsTooBig = 'The file exceeds the maximum allowed size of 10MB.';
    this.upload.i18n = { ...this.upload.i18n };
  }

  // tag::snippet[]
  protected override render() {
    const maxFileSizeInMB = 10;
    const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;
    return html`
      <h4>Upload file</h4>
      <p>Maximum file size: ${maxFileSizeInMB} MB</p>
      <vaadin-upload
        max-files="1"
        .maxFileSize="${maxFileSizeInBytes}"
        @file-reject="${(event: UploadFileRejectEvent) => {
          Notification.show(event.detail.error);
        }}"
      ></vaadin-upload>
    `;
  }
  // end::snippet[]
}
