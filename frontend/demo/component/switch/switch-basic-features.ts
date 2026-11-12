import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/switch';
import '@vaadin/tooltip';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('switch-basic-features')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-switch label="Autosave" helper-text="Automatically save changes as you work">
        <vaadin-tooltip slot="tooltip" text="Last saved 5 minutes ago"></vaadin-tooltip>
      </vaadin-switch>
      <!-- end::snippet[] -->
    `;
  }
}
