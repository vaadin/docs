import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
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
        <div>
          <div>Aria Bailey</div>
          <div style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);">
            Yeah, I know. But could you help me with...
          </div>
        </div>
        <vaadin-button>View</vaadin-button>
        <vaadin-button theme="tertiary-inline">
          <vaadin-icon icon="lumo:cross"></vaadin-icon>
        </vaadin-button>
      </vaadin-notification-card>
    `;
  }
}
