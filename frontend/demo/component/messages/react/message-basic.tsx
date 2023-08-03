import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { MessageList } from '@hilla/react-components/MessageList.js';
import { MessageInput } from '@hilla/react-components/MessageInput.js';
import type { MessageListItem } from '@vaadin/message-list';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<MessageListItem[]>([]);

  React.useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => {
      const person = people[0];
      setItems([
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
      ]);
    });
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <MessageList items={items} />
      <MessageInput
        onSubmit={(e) => {
          setItems([
            ...items,
            {
              text: e.detail.value,
              time: 'seconds ago',
              userName: 'Milla Sting',
              userAbbr: 'MS',
              userColorIndex: 3,
            },
          ]);
        }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
