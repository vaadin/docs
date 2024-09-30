import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { format, subDays, subMinutes } from 'date-fns';
import { useSignal } from '@vaadin/hilla-react-signals';
import { MessageList } from '@vaadin/react-components/MessageList.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

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
  return (
    // tag::snippet[]
    <MessageList
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
          userImg: person.value?.pictureUrl,
          className: 'current-user',
        },
      ]}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
