import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-messages/vaadin-message-list';
import '@vaadin/vaadin-messages/vaadin-message-input';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { MessageListItem } from '@vaadin/vaadin-messages';

@customElement('message-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: MessageListItem[] = [];

  async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    const person = people[0];
    this.items = [
      {
        text: 'Nature does not hurry, yet everything gets accomplished.',
        time: 'yesterday',
        userName: 'Matt Mambo',
        userColorIndex: 1,
      },
      {
        text: 'Using your talent, hobby or profession in a way that makes you contribute with something good to this world is truly the way to go.',
        time: 'right now',
        userName: 'Linsey Listy',
        userColorIndex: 2,
        userImg: person.pictureUrl,
      },
    ];
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-message-list .items="${this.items}"></vaadin-message-list>
      <vaadin-message-input @submit="${this._handleSubmit}"></vaadin-message-input>
      <!-- end::snippet[] -->
    `;
  }

  _handleSubmit(e: CustomEvent) {
    this.items = [
      ...this.items,
      {
        text: e.detail.value,
        time: 'seconds ago',
        userName: 'Milla Sting',
        userAbbr: 'MS',
        userColorIndex: 3,
      },
    ];
  }
}
