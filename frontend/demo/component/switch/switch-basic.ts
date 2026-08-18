import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/switch';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('switch-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-switch label="Notifications"></vaadin-switch>
      <!-- end::snippet[] -->
    `;
  }
}
