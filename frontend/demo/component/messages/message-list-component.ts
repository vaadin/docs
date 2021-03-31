import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-messages/vaadin-message-list';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import MessageListItem from './MessageListItem';
import { format, subDays, subMinutes } from 'date-fns';
import '@vaadin/flow-frontend/messageListConnector.js'; // hidden-full-source-line

@customElement('message-list-component')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: MessageListItem[] = [];

  async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    const person = people[0];
    const isoMinutes = 'yyyy-MM-dd HH:mm';
    const yesterday = format(subDays(new Date(), 1), isoMinutes);
    const fiftyMinutesAgo = format(subMinutes(new Date(), 50), isoMinutes);
    this.items = [
      {
        text: 'Linsey, could you check if the details with the order are okay?',
        time: yesterday,
        userName: 'Matt Mambo',
        userColorIndex: 1,
      },
      {
        text: 'All good. Ship it.',
        time: fiftyMinutesAgo,
        userName: 'Linsey Listy',
        userColorIndex: 2,
        userImg: person.pictureUrl,
      },
    ];
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-message-list .items=${this.items}></vaadin-message-list>
      <!-- end::snippet[] -->
    `;
  }
}
