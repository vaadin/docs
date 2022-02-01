import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/notification';
import { applyTheme } from 'Frontend/generated/theme';

const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(window.navigator.platform);

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
        <vaadin-horizontal-layout style="align-items: center;">
          <div>5 tasks deleted</div>
          <vaadin-button theme="primary" style="margin-left: var(--lumo-space-xl);">
            Undo ${isMac ? '⌘' : 'Ctrl-'}Z
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-notification-card>
    `;
  }
}
