import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useCallback, useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Details } from '@vaadin/react-components/Details.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { VirtualList } from '@vaadin/react-components/VirtualList.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

const avatarStyle = {
  height: '64px',
  width: '64px',
};

// tag::snippet[]
function Example() {
  useSignals(); // hidden-source-line
  const people = useSignal<Person[]>([]);
  const expandedPeople = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people: items }) => {
      people.value = items;
    });
  }, []);

  const personCardRenderer = useCallback(
    ({ item: person }: { item: Person }) => (
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
            opened={expandedPeople.value.includes(person)}
            onClick={({ currentTarget: details }) => {
              if (details.opened) {
                expandedPeople.value = [...expandedPeople.value, person];
              } else {
                expandedPeople.value = expandedPeople.value.filter((p) => p !== person);
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
    ),
    []
  );

  return <VirtualList items={people.value} renderer={personCardRenderer} />;
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
