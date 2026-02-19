import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import img from '../../../../src/main/resources/images/vaadin-logo-dark.png?url';

@customElement('button-images')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button theme="icon">
        <img src="${img}" width="100" alt="Vaadin logo" />
      </vaadin-button>
      <!-- end::snippet[] -->
    `;
  }
}
