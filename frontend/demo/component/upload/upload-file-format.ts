import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { showErrorNotification } from 'Frontend/demo/notification-helper';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadElement, UploadFileRejectEvent } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-file-format')
export class Example extends LitElement {
  static get styles() {
    return css`
      h4 {
        margin-top: 0;
      }

      p {
        color: var(--lumo-secondary-text-color);
      }
    `;
  }

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('vaadin-upload')
  private upload?: UploadElement;

  firstUpdated() {
    if (this.upload?.i18n) {
      this.upload.i18n.addFiles.one = 'Upload Report...';
      this.upload.i18n.dropFiles.one = 'Drop report here';
      this.upload.i18n.error.incorrectFileType =
        'The provided file does not have the correct format. Please provide a PDF document.';
      this.upload.i18n = { ...this.upload.i18n };
    }
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <h4>Upload report</h4>
      <p>Accepted file formats: PDF (.pdf)</p>
      <vaadin-upload
        accept="application/pdf,.pdf"
        max-files="1"
        @file-reject="${(event: UploadFileRejectEvent) =>
          showErrorNotification(event.detail.error)}"
      ></vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }
}
