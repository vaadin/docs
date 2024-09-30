import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Item } from '@vaadin/react-components/Item.js';
import { ListBox } from '@vaadin/react-components/ListBox.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const selectedValues = useSignal<number[]>([0, 3]);

  useEffect(() => {
    getPeople({ count: 20 }).then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    // tag::snippet[]
    <ListBox
      multiple
      selectedValues={selectedValues.value}
      onSelectedValuesChanged={(e) => {
        selectedValues.value = e.detail.value;
      }}
      style={{ height: '200px' }}
    >
      {items.value.map((person, index) => (
        <Item key={index}>
          {person.firstName} {person.lastName}
        </Item>
      ))}
    </ListBox>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
