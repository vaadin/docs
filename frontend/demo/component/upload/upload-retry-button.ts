import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/upload';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import { createFakeUploadFiles } from './upload-demo-helpers'; // hidden-source-line

function createFakeFiles() {
  return createFakeUploadFiles([
    { name: 'Financials.xlsx', error: 'Something went wrong, please try again' },
  ]);
}

@customElement('upload-retry-button')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`<vaadin-upload .files="${createFakeFiles()}"></vaadin-upload>`;
  }
}
