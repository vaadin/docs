import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('button-focus')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button focus-ring>Keyboard focus</vaadin-button>
      <!-- end::snippet[] -->
    `;
  }
}
