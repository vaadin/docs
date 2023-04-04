import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/button';
import { applyTheme } from 'Frontend/generated/theme';
import img from '../../../../src/main/resources/images/vaadin-logo-dark.png';

@customElement('button-images')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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
