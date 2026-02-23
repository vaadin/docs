import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import '@vaadin/upload/vaadin-upload-button.js';
import '@vaadin/upload/vaadin-upload-file-list.js';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UploadManager } from '@vaadin/upload/vaadin-upload-manager.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('upload-manager-thumbnails')
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
  });

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <vaadin-upload-button .manager="${this.manager}"> Select Files </vaadin-upload-button>
        <vaadin-upload-file-list
          .manager="${this.manager}"
          theme="thumbnails"
          style="width: 100%"
        ></vaadin-upload-file-list>
      </vaadin-vertical-layout>
    `;
  }
  // end::snippet[]
}
