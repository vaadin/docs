import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <vaadin-notification-card slot="middle">
        <div>Financial report generated</div>
        <vaadin-button theme="tertiary-inline">
          <vaadin-icon icon="lumo:cross"></vaadin-icon>
        </vaadin-button>
      </vaadin-notification-card>
    `;
  }
}
