import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Select, type SelectItem } from '@hilla/react-components/Select.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<SelectItem[]>([]);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => {
      // tag::snippet[]
      setItems(
        people.map((person) => ({
          label: `${person.firstName} ${person.lastName}`,
          value: `${person.id}`,
        }))
      );
      // end::snippet[]
    });
  }, []);

  return <Select label="Assignee" items={items} />;
}

export default reactExample(Example); // hidden-source-line
