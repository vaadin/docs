import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Avatar } from '@vaadin/react-components';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout';
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

  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <Avatar />

      <Avatar name={`${person.value?.firstName} ${person.value?.lastName}`} />

      <Avatar
        img={person.value?.pictureUrl}
        name={`${person.value?.firstName} ${person.value?.lastName}`}
      />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
