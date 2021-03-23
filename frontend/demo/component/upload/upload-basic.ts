import '../../init'; // hidden-full-source-line
import { createFakeUploadFiles } from './upload-demo-helpers'; // hidden-full-source-line
import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  firstUpdated() {
    this.setFakeStatus();
  }

  setFakeStatus() {
    const upload = this.shadowRoot!.querySelector('vaadin-upload');
    upload!.files = createFakeUploadFiles([
      { name: 'Annual Report.docx', complete: true },
      {
        name: 'Workflow.pdf',
        progress: 60,
        status: '19.7 MB: 60% (remaining time: 00:12:34)',
      },
      { name: 'Financials.xlsx', error: 'An error occurred' },
    ]);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-upload></vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }
}
