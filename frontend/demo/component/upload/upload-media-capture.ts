import 'Frontend/demo/init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import '@vaadin/upload';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('upload-media-capture')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- Take a photo with the back camera -->
      <vaadin-upload accept="image/*" capture="environment"></vaadin-upload>
      <!-- end::snippet[] -->
    `;
  }
}
