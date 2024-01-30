import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';
import '@vaadin/upload';
import type { Upload, UploadFileRejectEvent } from '@vaadin/upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-file-count')
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
  private accessor upload!: Upload;

  protected override firstUpdated() {
    this.upload.i18n.error.tooManyFiles = 'You may only upload a maximum of three files at once.';
    this.upload.i18n = { ...this.upload.i18n };
  }

  // tag::snippet[]
  protected override render() {
    const maxFiles = 3;
    return html`
      <h4>Upload files</h4>
      <p>Maximum of ${maxFiles} files allowed</p>
      <vaadin-upload
        .maxFiles="${maxFiles}"
        @file-reject="${(event: UploadFileRejectEvent) => {
          Notification.show(event.detail.error);
        }}"
      ></vaadin-upload>
    `;
  }

  // end::snippet[]
}
