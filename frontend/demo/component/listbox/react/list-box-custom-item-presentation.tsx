import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Item } from '@vaadin/react-components/Item.js';
import { ListBox } from '@vaadin/react-components/ListBox.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const selectedValues = useSignal([0, 2]);
  const items = useSignal<Person[]>([]);
  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => {
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
    >
      {items.value.map((person) => (
        <Item
          value={String(items.value.indexOf(person))}
          key={items.value.indexOf(person)}
        >
          <div className='person-item'>
            <Avatar
              img={person.pictureUrl}
              name={`${person.firstName} ${person.lastName}`}
            />
            <span>{person.firstName} {person.lastName}</span>
            <span>{person.profession}</span>
          </div>
        </Item>
      ))}
    </ListBox>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
