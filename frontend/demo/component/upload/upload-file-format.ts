import '../../init'; // hidden-full-source-line
import './upload-demo-helpers'; // hidden-full-source-line
// hidden-full-source-line
import { css, customElement, html, LitElement, query } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadElement } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-file-format')
export class Example extends LitElement {
  static get styles() {
    return css`
      h4 {
        margin-top: 0;
      }

      p {
        color: var(--lumo-secondary-text-color);
      }
    `;
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @query('vaadin-upload')
  private upload?: UploadElement;

  firstUpdated() {
    if (this.upload?.i18n) {
      this.upload.i18n.addFiles.one = 'Upload Report...';
      this.upload.i18n.dropFiles.one = 'Drop report here';
      this.upload.i18n = { ...this.upload.i18n };
    }
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <h4>Upload report</h4>
      <p>Accepted file formats: PDF (.pdf)</p>
      <vaadin-upload accept="application/pdf" max-files="1"></vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }
}
