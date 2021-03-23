import '../../init'; // hidden-full-source-line
import { createFakeUploadFiles } from './upload-demo-helpers'; // hidden-full-source-line
// hidden-full-source-line
import { customElement, html, LitElement, query } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadElement } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-all-files')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @query('vaadin-upload')
  private upload?: UploadElement;

  // end::snippet[]
  firstUpdated() {
    if (this.upload?.i18n) {
      this.upload.i18n.addFiles.many = 'Select Files...';
      this.upload.i18n = { ...this.upload.i18n };
    }
    this.setFakeStatus();
  }

  // tag::snippet[]
  render() {
    return html`
      <vaadin-upload no-auto></vaadin-upload>
      <p>
        <vaadin-button theme="primary" @click="${this.uploadFiles}">
          Upload All Files
        </vaadin-button>
      </p>
      <!-- end::snippet[] -->
      <div style="text-align: center; margin-top: var(--lumo-space-l)">
        <vaadin-button @click="${this.setFakeStatus}">Reset demo</vaadin-button>
      </div>
      <!-- tag::snippet[] -->
    `;
  }

  uploadFiles() {
    this.upload?.uploadFiles();
  }
  // end::snippet[]

  setFakeStatus() {
    const upload = this.shadowRoot!.querySelector('vaadin-upload');
    upload!.files = createFakeUploadFiles([
      {
        name: 'Workflow.pdf',
        status: 'Queued',
        held: true,
      },
      {
        name: 'Financials.xlsx',
        status: 'Queued',
        held: true,
      },
    ]);
  }
}
