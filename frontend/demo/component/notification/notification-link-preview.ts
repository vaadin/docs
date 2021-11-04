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
      <vaadin-notification-card slot="middle">
        <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
          <div>Jason Bailey mentioned you in <a href="#">Project Q4</a></div>
          <vaadin-button theme="tertiary-inline">
            <iron-icon icon="lumo:cross"></iron-icon>
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-notification-card>
    `;
  }
}
