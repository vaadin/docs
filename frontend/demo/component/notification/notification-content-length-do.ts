import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/notification';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { html, LitElement } from 'lit';
import { applyTheme } from 'Frontend/demo/theme';

export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-notification-card slot="middle">
        <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
          <div>
            <div>Aria Bailey</div>
            <div style="font-size: 0.875rem; color: var(--vaadin-text-color-secondary);">
              Yeah, I know. But could you help me with...
            </div>
          </div>
          <vaadin-button slot="end">View</vaadin-button>
          <vaadin-button slot="end" theme="icon">
            <vaadin-icon icon="lumo:cross"></vaadin-icon>
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-notification-card>
    `;
  }
}
