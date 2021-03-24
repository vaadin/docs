import '../../init'; // hidden-full-source-line
import './upload-demo-helpers'; // hidden-full-source-line
import { createFakeFilesUploadAutoUploadDisabled } from './upload-demo-mock-files'; // hidden-full-source-line
import { internalProperty } from 'lit-element'; // hidden-full-source-line
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
  @internalProperty() // hidden-full-source-line
  private files = createFakeFilesUploadAutoUploadDisabled(); // hidden-full-source-line

  // tag::snippet[]
  @query('vaadin-upload')
  private upload?: UploadElement;

  firstUpdated() {
    if (this.upload?.i18n) {
      this.upload.i18n.addFiles.many = 'Select Files...';
      this.upload.i18n = { ...this.upload.i18n };
    }
  }

  render() {
    return html`
      <!-- hidden-source-line --><!-- prettier-ignore -->
      <vaadin-upload
        no-auto
        .files=${this.files /* hidden-source-line */}
      ></vaadin-upload>
    `;
  }
  // end::snippet[]
}
