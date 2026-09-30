import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/message-list';
import { format, subDays, subMinutes } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('message-list-bubble')
export class Example extends LitElement {
  private isoMinutes = 'yyyy-MM-dd HH:mm';
  private yesterday = format(subDays(new Date(), 1), this.isoMinutes);
  private fiftyMinutesAgo = format(subMinutes(new Date(), 50), this.isoMinutes);
  private fortyMinutesAgo = format(subMinutes(new Date(), 40), this.isoMinutes);

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-message-list
        theme="bubble"
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
            /* A message sent by the current user */
            theme: 'self',
          },
          {
            text: 'Great, the customer will be glad to hear that.',
            time: this.fortyMinutesAgo,
            userName: 'Sam Swanson',
            userColorIndex: 3,
          },
        ]}"
      ></vaadin-message-list>
      <!-- end::snippet[] -->
    `;
  }
}
