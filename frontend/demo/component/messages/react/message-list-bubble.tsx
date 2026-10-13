import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { format, subDays, subMinutes } from 'date-fns';
import { MessageList } from '@vaadin/react-components/MessageList.js';

function Example() {
  const isoMinutes = 'yyyy-MM-dd HH:mm';
  const yesterday = format(subDays(new Date(), 1), isoMinutes);
  const fiftyMinutesAgo = format(subMinutes(new Date(), 50), isoMinutes);
  const fortyMinutesAgo = format(subMinutes(new Date(), 40), isoMinutes);

  return (
    // tag::snippet[]
    <MessageList
      theme="bubble"
      items={[
        {
          text: 'Linsey, could you check if the details with the order are okay?',
          time: yesterday,
          userName: 'Matt Mambo',
          userColorIndex: 1,
        },
        {
          text: 'All good. Ship it.',
          time: fiftyMinutesAgo,
          userName: 'Linsey Listy',
          userColorIndex: 2,
          // A message sent by the current user
          theme: 'self',
        },
        {
          text: 'Great, the customer will be glad to hear that.',
          time: fortyMinutesAgo,
          userName: 'Sam Swanson',
          userColorIndex: 3,
        },
      ]}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
