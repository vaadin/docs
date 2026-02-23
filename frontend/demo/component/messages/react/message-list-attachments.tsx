import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { format, subDays, subMinutes } from 'date-fns';
import { MessageList } from '@vaadin/react-components/MessageList.js';
import landscapeImage from '../../../../../src/main/resources/images/reindeer.jpg?url';

function Example() {
  // tag::snippet[]
  const isoMinutes = 'yyyy-MM-dd HH:mm';
  const yesterday = format(subDays(new Date(), 1), isoMinutes);
  const fiftyMinutesAgo = format(subMinutes(new Date(), 50), isoMinutes);

  const items = [
    {
      text: 'Here are the documents for the project.',
      time: yesterday,
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
      text: "Thanks! Here's a photo from the offsite.",
      time: fiftyMinutesAgo,
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
  ];

  const [statusText, setStatusText] = useState(
    'Click an attachment to see its name here.'
  );

  return (
    <>
      <MessageList
        items={items}
        onAttachmentClick={(e) => {
          setStatusText('Clicked: ' + e.detail.attachment.name);
        }}
      />
      <span>{statusText}</span>
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
