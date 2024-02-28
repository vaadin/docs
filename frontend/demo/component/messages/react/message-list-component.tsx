import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { format, subDays, subMinutes } from 'date-fns';
import { MessageList } from '@vaadin/react-components/MessageList.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const person = useSignal<Person | undefined>(undefined);

  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => {
      person.value = people[0];
    });
  }, []);

  const isoMinutes = 'yyyy-MM-dd HH:mm';
  const yesterday = format(subDays(new Date(), 1), isoMinutes);
  const fiftyMinutesAgo = format(subMinutes(new Date(), 50), isoMinutes);

  const items = [
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
      userImg: person.value?.pictureUrl,
    },
  ];

  return <MessageList items={items} />;
}

export default reactExample(Example); // hidden-source-line
