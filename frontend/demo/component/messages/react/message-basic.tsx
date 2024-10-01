import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import type { MessageListItem } from '@vaadin/message-list';
import { MessageInput } from '@vaadin/react-components/MessageInput.js';
import { MessageList } from '@vaadin/react-components/MessageList.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<MessageListItem[]>([]);

  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => {
      const person = people[0];
      items.value = [
        {
          text: 'Nature does not hurry, yet everything gets accomplished.',
          time: 'yesterday',
          userName: 'Matt Mambo',
          userColorIndex: 1,
        },
        {
          text: 'Using your talent, hobby or profession in a way that makes you contribute with something good to this world is truly the way to go.',
          time: 'right now',
          userName: 'Linsey Listy',
          userColorIndex: 2,
          userImg: person.pictureUrl,
        },
      ];
    });
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <MessageList items={items.value} />
      <MessageInput
        onSubmit={(e) => {
          items.value = [
            ...items.value,
            {
              text: e.detail.value,
              time: 'seconds ago',
              userName: 'Milla Sting',
              userAbbr: 'MS',
              userColorIndex: 3,
            },
          ];
        }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
