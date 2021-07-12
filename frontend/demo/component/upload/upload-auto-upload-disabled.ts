import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { createFakeFilesUploadAutoUploadDisabled } from './upload-demo-mock-files'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadElement } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-auto-upload-disabled')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

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
      <vaadin-upload
        no-auto
        .files="${createFakeFilesUploadAutoUploadDisabled() /* hidden-source-line */}"
      ></vaadin-upload>
    `;
  }
  // end::snippet[]
}
