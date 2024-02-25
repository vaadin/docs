import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { AvatarGroup } from '@vaadin/react-components/AvatarGroup.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 6 }).then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    // tag::snippet[]
    <AvatarGroup
      items={items.value.map((person, index) => ({
        name: `${person.firstName} ${person.lastName}`,
        colorIndex: index,
      }))}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
