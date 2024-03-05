import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Crud } from '@vaadin/react-components';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      setItems(people);
    });
  }, []);

  // tag::snippet[]
  return <Crud include="firstName, lastName, profession" noSort noFilter items={items} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
