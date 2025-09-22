import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import '@vaadin/upload';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import { createFakeFilesUploadAutoUploadDisabled } from './upload-demo-mock-files'; // hidden-source-line

@customElement('upload-auto-upload-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  private uploadI18n = {
    addFiles: {
      many: 'Select Files...',
    },
  };

  protected override render() {
    return html`
      <vaadin-upload
        no-auto
        .i18n="${this.uploadI18n}"
        .files="${createFakeFilesUploadAutoUploadDisabled() /* hidden-source-line */}"
      ></vaadin-upload>
    `;
  }
  // end::snippet[]
}
