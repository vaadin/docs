import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/card';
import '@vaadin/scroller';
import '@vaadin/markdown';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('scroller-basic')
export class Example extends LitElement {
  private eventDetails = `
**Date & Time**

Saturday, July 19, 2025
9:00 AM – 5:00 PM (PDT)

**About This Event**

Join us for a full day of inspiring talks, hands-on workshops, and networking opportunities with industry leaders. Whether you're a seasoned developer or just starting out, there's something for everyone.

**Schedule**

- **9:00 AM** – Registration & Breakfast
- **10:00 AM** – Opening Keynote
- **11:30 AM** – Breakout Sessions
- **1:00 PM** – Lunch & Networking
- **2:30 PM** – Afternoon Workshops
- **4:30 PM** – Closing Remarks & Raffle

**What to Bring**

- Photo ID for check-in
- Laptop (optional, for workshops)
- Business cards for networking

**Parking**

Free parking available in Lot B. Street parking is limited.

**Contact**

Questions? Email us at events@techconf.io
`;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-card style="max-width: 400px">
        <div slot="title">Summer Tech Conference 2025</div>
        <!-- tag::snippet[] -->
        <vaadin-scroller theme="overflow-indicators" style="max-height: 300px">
          <vaadin-markdown .content="${this.eventDetails}"></vaadin-markdown>
        </vaadin-scroller>
        <!-- end::snippet[] -->
        <vaadin-button slot="footer">Add to calendar</vaadin-button>
      </vaadin-card>
    `;
  }
}
