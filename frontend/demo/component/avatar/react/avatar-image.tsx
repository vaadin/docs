import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import companyLogo from '../../../../../src/main/resources/images/company-logo.png';
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
      <Avatar
        img={person.value?.pictureUrl}
        name={`${person.value?.firstName} ${person.value?.lastName}`}
      />

      <Avatar img={companyLogo} name="Company Inc." />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
