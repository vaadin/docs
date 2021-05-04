import '../../init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { customElement, html, LitElement } from 'lit-element';
import '@polymer/iron-icon';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-button-icon')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-upload>
        <iron-icon slot="drop-label-icon" icon="vaadin:folder-open"></iron-icon>
      </vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }
}
