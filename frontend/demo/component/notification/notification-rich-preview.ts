import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-rich-preview')
export class Example extends LitElement {
  constructor() {
    super();
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-notification-card theme="success" slot="middle">
        <iron-icon icon="lumo:checkmark" class="checkmark"></iron-icon>
        <div>Application submitted!</div>
        <div style="width: 2em"></div>
        <vaadin-button>View</vaadin-button>
        <vaadin-button theme="tertiary-inline">
          <iron-icon icon="lumo:cross"></iron-icon>
        </vaadin-button>
      </vaadin-notification-card>

      <vaadin-notification-card theme="error" slot="middle">
        <iron-icon icon="vaadin:warning" class="warning"></iron-icon>
        <div>Failed to generate report</div>
        <div style="width: 2em"></div>
        <vaadin-button>Retry</vaadin-button>
        <vaadin-button theme="tertiary-inline">
          <iron-icon icon="lumo:cross"></iron-icon>
        </vaadin-button>
      </vaadin-notification-card>

      <vaadin-notification-card slot="middle">
        <vaadin-avatar name="Jason Bailey"></vaadin-avatar>
        <div><b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a></div>
        <vaadin-button theme="tertiary-inline">
          <iron-icon icon="lumo:cross"></iron-icon>
        </vaadin-button>
      </vaadin-notification-card>

      <vaadin-notification-card slot="middle">
        <iron-icon icon="lumo:checkmark" class="checkmark"></iron-icon>
        <div>
          <b style="color: var(--lumo-success-text-color);">Upload successful</b>
          <div style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);">
            <b>Financials.xlsx</b> is now available in <a href="#">Documents</a>
          </div>
        </div>
        <vaadin-button theme="tertiary-inline">
          <iron-icon icon="lumo:cross"></iron-icon>
        </vaadin-button>
      </vaadin-notification-card>
    `;
  }
}
