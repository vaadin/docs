import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { ComboBox } from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => {
      setItems(
        people.map((person) => ({
          ...person,
          displayName: `${person.profession} - ${person.firstName} ${person.lastName}`,
        }))
      );
    });
  }, []);

  return (
    // tag::snippet[]
    <ComboBox
      style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties}
      label="Employee"
      itemLabelPath="displayName"
      itemValuePath="id"
      items={items}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
