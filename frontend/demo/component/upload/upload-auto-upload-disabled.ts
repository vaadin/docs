import '../../init'; // hidden-full-source-line
import { createFakeUploadFiles } from './upload-demo-helpers'; // hidden-full-source-line
import { customElement, html, LitElement, query } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadElement } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-auto-upload-disabled')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @query('vaadin-upload')
  private upload?: UploadElement;

  firstUpdated() {
    if (this.upload?.i18n) {
      this.upload.i18n.addFiles.many = 'Select Files...';
      this.upload.i18n = { ...this.upload.i18n };
    }
    // end::snippet[]
    this.setFakeStatus();
    // tag::snippet[]
  }

  render() {
    return html`<vaadin-upload no-auto></vaadin-upload>`;
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
    ]);
  }
}
