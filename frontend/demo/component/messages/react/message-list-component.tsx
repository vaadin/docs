import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { format, subDays, subMinutes } from 'date-fns';
import { MessageList } from '@hilla/react-components/MessageList.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  // tag::snippet[]
  const [person, setPerson] = useState<Person>();
  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => setPerson(people[0]));
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
      userImg: person?.pictureUrl,
    },
  ];

  return <MessageList items={items} />;
  // end::snippet[]
}

export default reactExample(Example);
