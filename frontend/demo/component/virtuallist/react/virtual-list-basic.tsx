import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { VirtualList } from '@hilla/react-components/VirtualList.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Details } from '@hilla/react-components/Details.js';
import { Avatar } from '@hilla/react-components/Avatar.js';

const avatarStyle = {
  height: '64px',
  width: '64px',
};

function Example() {
  const [people, setPeople] = useState<Person[]>([]);
  const [expandedPeople, setExpandedPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people: items }) => setPeople(items));
  }, []);

  const personCardRenderer = ({ item: person }: { item: Person }) => (
    <HorizontalLayout theme="spacing margin">
      <Avatar
        img={person.pictureUrl}
        name={`${person.firstName} ${person.lastName}`}
        style={avatarStyle}
      />

      <VerticalLayout>
        <b>
          {person.firstName} {person.lastName}
        </b>
        <span>{person.profession}</span>

        <Details
          summary="Contact information"
          opened={expandedPeople.includes(person)}
          onClick={({ currentTarget: details }) => {
            if (details.opened) {
              setExpandedPeople([...expandedPeople, person]);
            } else {
              setExpandedPeople(expandedPeople.filter((p) => p !== person));
            }
          }}
        >
          <VerticalLayout>
            <span>{person.email}</span>
            <span>{person.address.phone}</span>
          </VerticalLayout>
        </Details>
      </VerticalLayout>
    </HorizontalLayout>
  );

  return (
    // tag::snippet[]
    <VirtualList items={people}>{personCardRenderer}</VirtualList>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
