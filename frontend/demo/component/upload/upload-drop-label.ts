import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-drop-label')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-upload>
        <vaadin-icon slot="drop-label-icon" icon="vaadin:cloud-upload-o"></vaadin-icon>
        <span slot="drop-label">
          Files will be uploaded to our cloud. Please note our
          <a href="https://vaadin.com/privacy-policy" target="_blank">privacy policy</a>
        </span>
      </vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }
}
