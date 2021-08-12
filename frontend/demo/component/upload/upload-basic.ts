import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { createFakeFilesUploadBasic } from './upload-demo-mock-files'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
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
