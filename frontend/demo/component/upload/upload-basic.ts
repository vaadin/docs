import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import '@vaadin/upload';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import { createFakeFilesUploadBasic } from './upload-demo-mock-files'; // hidden-source-line

@customElement('upload-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- Use the target attribute to specify the URL
           that handles the file upload -->
      <vaadin-upload
        target="/api/fileupload"
        .files="${createFakeFilesUploadBasic() /* hidden-source-line-trim */}"
      ></vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }
}
