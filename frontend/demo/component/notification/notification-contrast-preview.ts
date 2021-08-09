import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
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
      <vaadin-notification-card theme="contrast" slot="middle">
        5 tasks deleted
      </vaadin-notification-card>
    `;
  }
}
