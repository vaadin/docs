import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/message-list';
import { format, subDays, subMinutes } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import landscapeImage from '../../../../src/main/resources/images/reindeer.jpg?url';

@customElement('message-list-attachments')
export class Example extends LitElement {
  private yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm');
  private fiftyMinutesAgo = format(subMinutes(new Date(), 50), 'yyyy-MM-dd HH:mm');

  @state()
  private statusText = 'Click an attachment to see its name here.';

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-message-list
        @attachment-click="${(e: CustomEvent) => {
          this.statusText = 'Clicked: ' + e.detail.attachment.name;
        }}"
        .items="${[
          {
            text: 'Here are the documents for the project.',
            time: this.yesterday,
            userName: 'Matt Mambo',
            userColorIndex: 1,
            attachments: [
              {
                name: 'project-proposal.pdf',
                url: 'https://example.com/files/proposal.pdf',
                type: 'application/pdf',
              },
              {
                name: 'budget-overview.xlsx',
                url: 'https://example.com/files/budget.xlsx',
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              },
            ],
          },
          {
            text: 'Thanks! Here\u0027s a photo from the offsite.',
            time: this.fiftyMinutesAgo,
            userName: 'Linsey Listy',
            userColorIndex: 2,
            attachments: [
              {
                name: 'landscape.jpg',
                url: landscapeImage,
                type: 'image/jpeg',
              },
            ],
          },
        ]}"
      ></vaadin-message-list>
      <span>${this.statusText}</span>
      <!-- end::snippet[] -->
    `;
  }
}
