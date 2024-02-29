import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Avatar } from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => {
      setPerson(people[0]);
    });
  }, []);

  return (
    // tag::snippet[]
    <Avatar name={`${person?.firstName} ${person?.lastName}`} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
