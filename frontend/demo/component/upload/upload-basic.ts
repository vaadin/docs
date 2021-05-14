import '../../init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { createFakeFilesUploadBasic } from './upload-demo-mock-files'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement} from `lit/decorators.js`;
import '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-upload
        .files="${createFakeFilesUploadBasic() /* hidden-source-line-trim */}"
      ></vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }
}
