import '../../init'; // hidden-full-source-line
import { createFakeUploadFiles } from './upload-demo-helpers'; // hidden-full-source-line
// hidden-full-source-line
import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-clear-button')
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
      {
        name: 'Workflow.pdf',
        progress: 60,
        status: '19.7 MB: 60% (remaining time: 00:12:34)',
      },
      { name: 'Financials.xlsx', complete: true },
    ]);
  }

  render() {
    return html`
      <vaadin-upload></vaadin-upload>
      <div style="text-align: center; margin-top: var(--lumo-space-l)">
        <vaadin-button @click="${this.setFakeStatus}">Reset demo</vaadin-button>
      </div>
    `;
  }
}
