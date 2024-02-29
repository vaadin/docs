import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { AvatarGroup } from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 3 }).then(({ people }) => setItems(people));
  }, []);

  return (
    // tag::snippet[]
    <AvatarGroup
      items={items.map((person) => ({
        name: `${person.firstName} ${person.lastName}`,
      }))}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
