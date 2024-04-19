import {
  reactExample
} from 'Frontend/demo/react-example'; // hidden-source-line
import React, {
  useEffect
} from 'react';
import {
  useComputed,
  useSignal
} from '@vaadin/hilla-react-signals';
import {
  useSignals
} from '@preact/signals-react/runtime'; // hidden-source-line
import {
  AvatarGroup
} from '@vaadin/react-components/AvatarGroup.js';
import {
  getPeople
} from 'Frontend/demo/domain/DataService';
import type Person
  from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const peopleData = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople({count: 3}).then(({people}) => {
      peopleData.value = people;
    });
  }, []);

  // tag::snippet[]
  const avatars = useComputed(() =>
    peopleData.value.map((person) => ({
      name: `${person.firstName} ${person.lastName}`,
    }))
  );

  return (
    <AvatarGroup items={avatars.value}/>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
