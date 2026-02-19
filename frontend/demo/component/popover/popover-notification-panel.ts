import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/message-list';
import '@vaadin/popover';
import '@vaadin/tabsheet';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { format, subMinutes } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { MessageListItem } from '@vaadin/message-list';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('popover-notifications-panel')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  allNotifications: MessageListItem[] = [];

  @state()
  unreadNotifications: MessageListItem[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 4 });

    this.unreadNotifications = [
      {
        userName: `${people[0].firstName} ${people[0].lastName}`,
        userImg: people[0].pictureUrl,
        time: format(subMinutes(new Date(), 20), 'HH:mm'),
        text: 'Could you send me the latest TPS report from the ACME project?',
      },
      {
        userName: `${people[1].firstName} ${people[1].lastName}`,
        userImg: people[1].pictureUrl,
        time: format(subMinutes(new Date(), 30), 'HH:mm'),
        text: 'Hey, are we on track for the trade show next month?',
      },
      {
        userName: `${people[2].firstName} ${people[2].lastName}`,
        userImg: people[2].pictureUrl,
        time: format(subMinutes(new Date(), 35), 'HH:mm'),
        text: `TPS reports look good! I'm going to pass it on to Alliyah next.`,
      },
    ];
    this.allNotifications = [
      ...this.unreadNotifications,
      {
        userName: `${people[3].firstName} ${people[3].lastName}`,
        userImg: people[3].pictureUrl,
        time: format(subMinutes(new Date(), 55), 'HH:mm'),
        text: 'Hi, are you going to attend the brainstorming session tomorrow?',
      },
    ];
  }

  protected override render() {
    return html`
      <vaadin-button id="show-notifications" aria-label="Notifications" theme="icon">
        <vaadin-icon icon="lumo:bell"></vaadin-icon>
      </vaadin-button>
      <!-- tag::snippet[] -->
      <vaadin-popover
        for="show-notifications"
        theme="arrow no-padding"
        modal
        aria-labelledby="notifications-heading"
        width="300px"
        position="bottom"
      >
        ${this.renderNotifications(this.unreadNotifications, this.allNotifications)}
      </vaadin-popover>
      <!-- end::snippet[] -->
    `;
  }

  renderNotifications(unread: MessageListItem[], all: MessageListItem[]) {
    return html`
      <vaadin-horizontal-layout
        style="align-items: center; padding: var(--vaadin-padding-l) var(--vaadin-padding-l) var(--vaadin-padding-s)"
      >
        <h4 style="margin: 0" id="notifications-heading">Notifications</h4>
        <vaadin-button theme="small" style="margin: 0 0 0 auto;" @click="${this.markAllRead}">
          Mark all read
        </vaadin-button>
      </vaadin-horizontal-layout>
      <vaadin-tabsheet class="notifications" theme="small no-padding no-border">
        <vaadin-tabs slot="tabs">
          <vaadin-tab id="unread-tab">Unread</vaadin-tab>
          <vaadin-tab id="all-tab">All</vaadin-tab>
        </vaadin-tabs>
        <div tab="unread-tab">
          ${unread.length
            ? html`<vaadin-message-list .items="${unread}"></vaadin-message-list>`
            : html`<div class="no-notifications-msg">No unread notifications</div>`}
        </div>
        <div tab="all-tab">
          <vaadin-message-list .items="${all}"></vaadin-message-list>
        </div>
      </vaadin-tabsheet>
    `;
  }

  markAllRead() {
    this.unreadNotifications = [];
  }
}
