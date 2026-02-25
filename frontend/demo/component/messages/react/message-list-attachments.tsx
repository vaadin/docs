import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { format, subDays, subMinutes } from 'date-fns';
import { useSignal } from '@vaadin/hilla-react-signals';
import { MessageList } from '@vaadin/react-components/MessageList.js';
import landscapeImage from '../../../../../src/main/resources/images/reindeer.jpg?url';

function Example() {
  useSignals(); // hidden-source-line

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

  const statusText = useSignal('Click an attachment to see its name here.');

  return (
    <>
      <MessageList
        items={items}
        ref={(messageList) => {
          if (messageList) {
            messageList.addEventListener('attachment-click', (e: CustomEvent) => {
              statusText.value = 'Clicked: ' + e.detail.attachment.name;
            });
          }
        }}
        // Switch to using onAttachmentClick once https://github.com/vaadin/web-components/pull/11189 is available in a release.
        // onAttachmentClick={(e) => {
        //   statusText.value = 'Clicked: ' + e.detail.attachment.name;
        // }}
      />
      <span>{statusText.value}</span>
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
