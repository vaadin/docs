import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-messages/vaadin-message-list';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { format, subDays, subMinutes } from 'date-fns';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('message-list-component')
export class Example extends LitElement {
  private person: Person | undefined;
  private isoMinutes = 'yyyy-MM-dd HH:mm';
  private yesterday = format(subDays(new Date(), 1), this.isoMinutes);
  private fiftyMinutesAgo = format(subMinutes(new Date(), 50), this.isoMinutes);

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    this.person = people[0];
    this.requestUpdate();
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-message-list
        .items="${[
          {
            text: 'Linsey, could you check if the details with the order are okay?',
            time: this.yesterday,
            userName: 'Matt Mambo',
            userColorIndex: 1,
          },
          {
            text: 'All good. Ship it.',
            time: this.fiftyMinutesAgo,
            userName: 'Linsey Listy',
            userColorIndex: 2,
            userImg: this.person ? this.person.pictureUrl : undefined,
          },
        ]}"
      ></vaadin-message-list>
      <!-- end::snippet[] -->
    `;
  }
}
