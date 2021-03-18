import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-messages/vaadin-message-list';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import MessageListItem from './MessageListItem';

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
    this.items = [
      {
        text: 'Hello list',
        time: 'yesterday',
        userName: 'Matt Mambo',
        userAbbr: 'MM',
        userColorIndex: 1,
      },
      {
        text: 'Another message',
        time: 'right now',
        userName: 'Linsey Listy',
        userAbbr: 'LL',
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
