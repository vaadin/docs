import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/upload/vaadin-upload-button.js';
import '@vaadin/upload/vaadin-upload-file-list.js';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UploadManager } from '@vaadin/upload';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('upload-manager-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private manager = new UploadManager({
    target: '/api/fileupload',
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    accept: 'image/*,application/pdf',
  });

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="spacing padding">
        <vaadin-upload-button .manager="${this.manager}"> Select Files </vaadin-upload-button>
        <vaadin-upload-file-list .manager="${this.manager}"></vaadin-upload-file-list>
      </vaadin-vertical-layout>
    `;
  }
  // end::snippet[]
}
