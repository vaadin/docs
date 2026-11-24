import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import '@vaadin/pdf-viewer';
import '@vaadin/select';
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import type {
  PdfViewer,
  PdfViewerPageChangedEvent,
  PdfViewerPageCountChangedEvent,
} from '@vaadin/pdf-viewer';
import type { SelectValueChangedEvent } from '@vaadin/select';
import { applyTheme } from 'Frontend/demo/theme';
import pdfUrl from '../../../../src/main/resources/documents/user-guide.pdf?url';

@customElement('pdf-viewer-navigation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  private chapters = [
    { label: 'Getting started', value: '2' },
    { label: 'Recording time', value: '4' },
    { label: 'Submitting a timesheet', value: '6' },
    { label: 'Reports', value: '8' },
    { label: 'Troubleshooting', value: '12' },
  ];

  @query('vaadin-pdf-viewer')
  private viewer!: PdfViewer;

  @state()
  private page = 1;

  @state()
  private pageCount = 0;

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: baseline">
        <vaadin-select
          placeholder="Go to chapter"
          .items="${this.chapters}"
          @value-changed="${(event: SelectValueChangedEvent) => {
            if (event.detail.value) {
              this.viewer.scrollToPage(Number(event.detail.value));
            }
          }}"
        ></vaadin-select>
        <span>${this.pageCount ? `Page ${this.page} of ${this.pageCount}` : ''}</span>
      </vaadin-horizontal-layout>

      <vaadin-pdf-viewer
        src="${pdfUrl}"
        file-name="user-guide.pdf"
        style="height: 500px"
        @page-changed="${(event: PdfViewerPageChangedEvent) => {
          this.page = event.detail.value;
        }}"
        @page-count-changed="${(event: PdfViewerPageCountChangedEvent) => {
          this.pageCount = event.detail.value;
        }}"
      ></vaadin-pdf-viewer>
    `;
  }
  // end::snippet[]
}
