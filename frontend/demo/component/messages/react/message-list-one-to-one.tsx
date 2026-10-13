import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { format, subMinutes } from 'date-fns';
import { MessageList, type MessageListItem } from '@vaadin/react-components/MessageList.js';

function Example() {
  const isoMinutes = 'yyyy-MM-dd HH:mm';
  const fiveMinutesAgo = format(subMinutes(new Date(), 5), isoMinutes);
  const fourMinutesAgo = format(subMinutes(new Date(), 4), isoMinutes);

  // tag::snippet[]
  const items: MessageListItem[] = [
    {
      text: 'Which orders are still waiting for shipment?',
      time: fiveMinutesAgo,
      userName: 'Linsey Listy',
      theme: 'self',
    },
    {
      text: `These orders are waiting for shipment:

- **#1042**, paid yesterday
- **#1043**, paid today
- **#1045**, waiting for stock

The first two can ship today. Order #1045 ships when the missing items arrive.`,
      time: fourMinutesAgo,
      userName: 'Assistant',
      theme: 'full-width',
    },
  ];

  return <MessageList theme="bubble one-to-one" items={items} markdown />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
