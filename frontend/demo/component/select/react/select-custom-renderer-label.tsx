import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Item } from '@vaadin/react-components/Item.js';
import { ListBox } from '@vaadin/react-components/ListBox.js';
import { Select } from '@vaadin/react-components/Select.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

const formatPersonFullName = (person: Person) => `${person.firstName} ${person.lastName}`;

function Example() {
  useSignals(); // hidden-source-line
  const people = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people: items }) => {
      people.value = items;
    });
  }, []);

  return (
    // tag::snippet[]
    <Select label="Assignee">
      <ListBox>
        {people.value.map((person) => (
          // Use the label attribute to display full name of the person as selected value label
          <Item value={String(person.id)} key={person.id} label={formatPersonFullName(person)}>
            <div className="person-item">
              <img
                src={person.pictureUrl}
                alt={`Portrait of ${formatPersonFullName(person)}`}
                style={{ width: '2.25rem' }}
              />
              <span>{formatPersonFullName(person)}</span>
              <span>{person.profession}</span>
            </div>
          </Item>
        ))}
      </ListBox>
    </Select>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
