import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { Card } from '@vaadin/react-components/Card.js';
import { Markdown } from '@vaadin/react-components/Markdown.js';
import { Scroller } from '@vaadin/react-components/Scroller.js';

const eventDetails = `
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

function Example() {
  return (
    <Card style={{ maxWidth: '400px' }}>
      <div slot="title">
        Summer Tech Conference 2025
      </div>
      {/* tag::snippet[] */}
      <Scroller
        theme="overflow-indicator-top"
        style={{ maxHeight: '300px', '--vaadin-scroller-padding-block': '1rem' }}
      >
        <Markdown>{eventDetails}</Markdown>
      </Scroller>
      {/* end::snippet[] */}
      <Button slot="footer">Add to calendar</Button>
    </Card>
  );
}

export default reactExample(Example); // hidden-source-line
