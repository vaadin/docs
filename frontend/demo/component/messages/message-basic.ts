import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/message-input';
import '@vaadin/message-list';
import type { MessageInputSubmitEvent } from '@vaadin/message-input';
import type { MessageListItem } from '@vaadin/message-list';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';

@customElement('message-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: MessageListItem[] = [];

  protected override async firstUpdated() {
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

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-message-list .items="${this.items}"></vaadin-message-list>
      <vaadin-message-input @submit="${this._handleSubmit}"></vaadin-message-input>
      <!-- end::snippet[] -->
    `;
  }

  _handleSubmit(e: MessageInputSubmitEvent) {
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
