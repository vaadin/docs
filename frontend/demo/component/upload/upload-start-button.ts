import '../../init'; // hidden-source-line
import { createFakeUploadFiles } from './upload-demo-helpers'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

function createFakeFiles() {
  return createFakeUploadFiles([
    {
      name: 'Workflow.pdf',
      status: 'Queued',
      held: true,
    },
  ]);
}

@customElement('upload-start-button')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`<vaadin-upload .files="${createFakeFiles()}"></vaadin-upload>`;
  }
}
