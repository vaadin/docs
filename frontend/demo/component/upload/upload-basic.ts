import '../../init'; // hidden-full-source-line
import './upload-demo-helpers'; // hidden-full-source-line
import { createFakeFilesUploadBasic } from './upload-demo-mock-files'; // hidden-full-source-line
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
  private files = createFakeFilesUploadBasic(); // hidden-full-source-line

  render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- hidden-source-line --><!-- prettier-ignore -->
      <vaadin-upload
        .files=${this.files /* hidden-source-line */}
      ></vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }
}
