import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit-element';
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
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
        <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
          <div>5 tasks deleted</div>
          <vaadin-button theme="tertiary-inline" style="margin-left: var(--lumo-space-xl);">
            Undo
          </vaadin-button>
          <vaadin-button theme="tertiary-inline" aria-label="Close">
            <iron-icon icon="lumo:cross"></iron-icon>
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-notification-card>
    `;
  }
}
