import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/message-list';
import { format, subMinutes } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { MessageListItem } from '@vaadin/message-list';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('message-list-one-to-one')
export class Example extends LitElement {
  private isoMinutes = 'yyyy-MM-dd HH:mm';
  private fiveMinutesAgo = format(subMinutes(new Date(), 5), this.isoMinutes);
  private fourMinutesAgo = format(subMinutes(new Date(), 4), this.isoMinutes);

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  private items: MessageListItem[] = [
    {
      text: 'Which orders are still waiting for shipment?',
      time: this.fiveMinutesAgo,
      userName: 'Linsey Listy',
      theme: 'self',
    },
    {
      text: `These orders are waiting for shipment:

- **#1042**, paid yesterday
- **#1043**, paid today
- **#1045**, waiting for stock

The first two can ship today. Order #1045 ships when the missing items arrive.`,
      time: this.fourMinutesAgo,
      userName: 'Assistant',
      theme: 'full-width',
    },
  ];

  protected override render() {
    return html`
      <vaadin-message-list
        theme="bubble one-to-one"
        .items="${this.items}"
        markdown
      ></vaadin-message-list>
    `;
  }
  // end::snippet[]
}
