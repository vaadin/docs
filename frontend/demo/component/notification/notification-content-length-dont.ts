import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

export class Example extends LitElement {
  constructor() {
    super();
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-notification-card slot="middle">
        <div>
          <div>New message from Aria Bailey</div>
          <div style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);">
            Yeah, I know. But could you help me with this. I’m not sure where the bug is in my CSS?
            The checkmark doesn’t get the right color. I’m trying to use the CSS custom properties
            from our design system, but for some reason it’s not working.
          </div>
        </div>
        <vaadin-button theme="tertiary-inline">
          <iron-icon icon="lumo:cross"></iron-icon>
        </vaadin-button>
      </vaadin-notification-card>
    `;
  }
}
