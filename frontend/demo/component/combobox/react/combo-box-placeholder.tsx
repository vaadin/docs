import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { ComboBox } from '@hilla/react-components/ComboBox.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) =>
      setItems(
        people.map((person) => ({
          ...person,
          displayName: `${person.firstName} ${person.lastName}`,
        }))
      )
    );
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <ComboBox
        placeholder="Select employee"
        label="Employee"
        itemLabelPath="displayName"
        itemValuePath="id"
        items={items}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
