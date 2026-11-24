import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/upload';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import { createFakeFilesUploadStartButton } from './upload-demo-mock-files'; // hidden-source-line

@customElement('upload-start-button')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-upload
        .files="${createFakeFilesUploadStartButton() /* hidden-source-line-trim */}"
      ></vaadin-upload>
    `;
  }
}
