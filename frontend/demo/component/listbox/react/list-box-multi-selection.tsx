import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { ListBox } from '@hilla/react-components/ListBox.js';
import { Item } from '@hilla/react-components/Item.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  const [selectedValues, setSelectedValues] = useState<number[]>([0, 3]);

  useEffect(() => {
    getPeople({ count: 20 }).then(({ people }) => setItems(people));
  }, []);

  return (
    // tag::snippet[]
    <ListBox
      multiple
      selectedValues={selectedValues}
      onSelectedValuesChanged={(e) => setSelectedValues(e.detail.value)}
      style={{ height: '200px' }}
    >
      {items.map((person, index) => (
        <Item key={index}>
          {person.firstName} {person.lastName}
        </Item>
      ))}
    </ListBox>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
