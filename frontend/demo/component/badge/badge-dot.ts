import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/badge';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('badge-dot')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
        <!-- tag::snippet[] -->
        <vaadin-badge theme="dot">Pending</vaadin-badge>
        <vaadin-badge theme="dot success">Confirmed</vaadin-badge>
        <vaadin-badge theme="dot warning">Warning</vaadin-badge>
        <vaadin-badge theme="dot error">Denied</vaadin-badge>

        <vaadin-button theme="icon" aria-label="Downloads">
          <vaadin-icon icon="lumo:download"></vaadin-icon>
          <vaadin-badge
            slot="suffix"
            theme="dot success"
            number="3"
            style="position: absolute; top: 0.3em; right: 0.3em;"
          >
            completed
          </vaadin-badge>
        </vaadin-button>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
