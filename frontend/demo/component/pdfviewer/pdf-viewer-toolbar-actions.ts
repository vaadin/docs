import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/pdf-viewer';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';
import { applyTheme } from 'Frontend/demo/theme';
import pdfUrl from '../../../../src/main/resources/documents/invoice.pdf?url';

@customElement('pdf-viewer-toolbar-actions')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-pdf-viewer src="${pdfUrl}" file-name="invoice.pdf" style="height: 500px">
        <!-- tag::snippet[] -->
        <vaadin-button
          slot="toolbar-actions"
          theme="tertiary"
          @click="${() => Notification.show('Invoice approved')}"
        >
          Approve
        </vaadin-button>
        <!-- end::snippet[] -->
      </vaadin-pdf-viewer>
    `;
  }
}
