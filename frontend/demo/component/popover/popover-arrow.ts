import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/icon';
import '@vaadin/popover';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('popover-arrow')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-button id="target" aria-label="notifications" theme="icon">
        <vaadin-icon icon="lumo:bell"></vaadin-icon>
      </vaadin-button>
      <!-- tag::snippet[] -->
      <vaadin-popover for="target" theme="arrow">
        <div>No new notifications</div>
      </vaadin-popover>
      <!-- end::snippet[] -->
    `;
  }
}
