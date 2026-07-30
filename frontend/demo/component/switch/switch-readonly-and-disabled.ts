import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/switch';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('switch-readonly-and-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-switch
          label="Audit log retention (90 days)"
          helper-text="Included on the Business plan"
          readonly
          checked
        ></vaadin-switch>

        <vaadin-switch label="Daily digest" disabled></vaadin-switch>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
