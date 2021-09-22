import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import { NotificationElement } from '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-static-helper')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  handleTextNotification() {
    // tag::snippet[]
    // Show a simple text-based notification
    NotificationElement.show('Financial report generated', {
      position: 'middle',
    });
    // end::snippet[]
  }

  handleLitTemplateNotification() {
    // tag::snippet[]
    // Show a notification with markup using a Lit template
    NotificationElement.show(
      html`
        <b>@John:</b>
        &nbsp;
        <span>
          How about lunch at
          <span style="color: var(--lumo-primary-text-color)">12:30pm</span>?
        </span>
      `,
      {
        position: 'middle',
      }
    );
    // end::snippet[]
  }

  render() {
    return html`
      <vaadin-button @click="${this.handleTextNotification}">
        Show text notification
      </vaadin-button>
      <vaadin-button @click="${this.handleLitTemplateNotification}">
        Show notification with markup
      </vaadin-button>
    `;
  }
}
