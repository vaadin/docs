import '../../init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { css, customElement, html, LitElement, query } from 'lit-element';
import { showErrorNotification } from 'Frontend/demo/notification-helper';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadElement, UploadFileReject } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-helper')
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
      this.upload.i18n.addFiles.one = 'Upload Spreadsheet...';
      this.upload.i18n.dropFiles.one = 'Drop spreadsheet here';
      this.upload.i18n = { ...this.upload.i18n };
    }
  }

  render() {
    // end::snippet[]
    const maxFileSizeInMB = 1;
    const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;
    const acceptedTypes = [
      // Microsoft Excel (.xls)
      'application/vnd.ms-excel',
      '.xls',
      // Microsoft Excel (OpenXML, .xlsx)
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.xlsx',
      // Comma-separated values (.csv)
      'text/csv',
      '.csv',
    ];
    // tag::snippet[]
    return html`
      <h4>Upload spreadsheet</h4>
      <p>
        File size must be less than or equal to ${maxFileSizeInMB} MB.<br />
        Only Excel and CSV files are accepted.
      </p>
      <vaadin-upload
        max-files="1"
        .maxFileSize="${maxFileSizeInBytes}"
        .accept="${acceptedTypes.join(',')}"
        @file-reject="${this.fileRejectHandler}"
      ></vaadin-upload>
    `;
  }
  // end::snippet[]

  fileRejectHandler(event: UploadFileReject) {
    showErrorNotification(`Error: ${event.detail.error} '${event.detail.file.name}'`);
  }
}
