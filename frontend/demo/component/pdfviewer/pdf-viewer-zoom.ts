import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/pdf-viewer';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import pdfUrl from '../../../../src/main/resources/documents/user-guide.pdf?url';

@customElement('pdf-viewer-zoom')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-pdf-viewer
        src="${pdfUrl}"
        file-name="user-guide.pdf"
        zoom="page-fit"
        style="height: 500px"
      ></vaadin-pdf-viewer>
      <!-- end::snippet[] -->
    `;
  }
}
