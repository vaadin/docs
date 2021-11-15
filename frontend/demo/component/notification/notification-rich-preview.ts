import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-rich-preview')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <vaadin-notification-card theme="success" slot="middle">
        <vaadin-horizontal-layout theme="spacing" style="align-items: center">
          <iron-icon icon="vaadin:check-circle"></iron-icon>
          <div>Application submitted!</div>
          <vaadin-button style="margin: 0 0 0 var(--lumo-space-l)">View</vaadin-button>
          <vaadin-button theme="tertiary-inline">
            <iron-icon icon="lumo:cross"></iron-icon>
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-notification-card>

      <vaadin-notification-card theme="error" slot="middle">
        <vaadin-horizontal-layout theme="spacing" style="align-items: center">
          <iron-icon icon="vaadin:warning"></iron-icon>
          <div>Failed to generate report</div>
          <vaadin-button style="margin: 0 0 0 var(--lumo-space-l)">Retry</vaadin-button>
          <vaadin-button theme="tertiary-inline">
            <iron-icon icon="lumo:cross"></iron-icon>
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-notification-card>

      <vaadin-notification-card slot="middle">
        <vaadin-horizontal-layout theme="spacing" style="align-items: center">
          <vaadin-avatar name="Jason Bailey"></vaadin-avatar>
          <div><b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a></div>
          <vaadin-button theme="tertiary-inline">
            <iron-icon icon="lumo:cross"></iron-icon>
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-notification-card>

      <vaadin-notification-card slot="middle">
        <vaadin-horizontal-layout theme="spacing" style="align-items: center">
          <iron-icon
            icon="vaadin:check-circle"
            style="color: var(--lumo-success-color)"
          ></iron-icon>
          <div>
            <b style="color: var(--lumo-success-text-color);">Upload successful</b>
            <div
              style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);"
            >
              <b>Financials.xlsx</b> is now available in <a href="#">Documents</a>
            </div>
          </div>
          <vaadin-button theme="tertiary-inline">
            <iron-icon icon="lumo:cross"></iron-icon>
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-notification-card>
    `;
  }
}
