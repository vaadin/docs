import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Avatar } from '@vaadin/react-components/Avatar.js';
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
      <Avatar name={`${person.value?.firstName} ${person.value?.lastName}`} theme="xlarge" />

      <Avatar name={`${person.value?.firstName} ${person.value?.lastName}`} theme="large" />

      <Avatar name={`${person.value?.firstName} ${person.value?.lastName}`} theme="small" />

      <Avatar name={`${person.value?.firstName} ${person.value?.lastName}`} theme="xsmall" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
