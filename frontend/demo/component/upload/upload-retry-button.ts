import '../../init'; // hidden-source-line
import { createFakeUploadFiles } from './upload-demo-helpers'; // hidden-source-line
import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

function createFakeFiles() {
  return createFakeUploadFiles([
    { name: 'Financials.xlsx', error: 'Something went wrong, please try again' },
  ]);
}

@customElement('upload-retry-button')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`<vaadin-upload .files="${createFakeFiles()}"></vaadin-upload>`;
  }
}
