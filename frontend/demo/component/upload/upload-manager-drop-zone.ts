import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/upload/vaadin-upload-button.js';
import '@vaadin/upload/vaadin-upload-drop-zone.js';
import '@vaadin/upload/vaadin-upload-file-list.js';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UploadManager } from '@vaadin/upload';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('upload-manager-drop-zone')
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
    maxFiles: 10,
    accept: 'image/*',
  });

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <vaadin-upload-drop-zone
          .manager="${this.manager}"
          style="
            border: 2px dashed var(--lumo-contrast-30pct);
            border-radius: var(--lumo-border-radius-l);
            padding: var(--lumo-space-l);
            display: flex;
            justify-content: center;
          "
        >
          <vaadin-horizontal-layout theme="spacing" style="align-items: center">
            <vaadin-icon icon="vaadin:upload"></vaadin-icon>
            <span>Drop images here or</span>
            <vaadin-upload-button .manager="${this.manager}">Browse</vaadin-upload-button>
          </vaadin-horizontal-layout>
        </vaadin-upload-drop-zone>
        <vaadin-upload-file-list .manager="${this.manager}"></vaadin-upload-file-list>
      </vaadin-vertical-layout>
    `;
  }
  // end::snippet[]
}
