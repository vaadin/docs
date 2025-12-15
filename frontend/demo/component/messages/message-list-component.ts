import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/message-list';
import { format, subDays, subMinutes } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('message-list-component')
export class Example extends LitElement {
  private person: Person | undefined;
  private isoMinutes = 'yyyy-MM-dd HH:mm';
  private yesterday = format(subDays(new Date(), 1), this.isoMinutes);
  private fiftyMinutesAgo = format(subMinutes(new Date(), 50), this.isoMinutes);

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    this.person = people[0];
    this.requestUpdate();
  }

  protected override render() {
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
