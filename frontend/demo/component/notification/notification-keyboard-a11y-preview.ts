import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

const isMac = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].indexOf(window.navigator.platform) > -1;

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
        <div>5 tasks deleted</div>
        <div style="width: 2em"></div>
        <vaadin-button theme="primary">
          Undo
          <span aria-hidden="true"> &nbsp; ${isMac ? '⌘' : 'Ctrl-'}Z</span>
        </vaadin-button>
      </vaadin-notification-card>
    `;
  }
}
