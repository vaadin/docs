import 'Frontend/demo/init'; // hidden-source-line
import { createFakeUploadFiles } from './upload-demo-helpers'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/upload';
import { applyTheme } from 'Frontend/generated/theme';

function createFakeFiles() {
  return createFakeUploadFiles([
    {
      name: 'Workflow.pdf',
      progress: 60,
      status: '19.7 MB: 60% (remaining time: 00:12:34)',
    },
    { name: 'Financials.xlsx', complete: true },
  ]);
}

@customElement('upload-clear-button')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`<vaadin-upload .files="${createFakeFiles()}"></vaadin-upload>`;
  }
}
