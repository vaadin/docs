import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Item } from '@vaadin/react-components/Item.js';
import { ListBox } from '@vaadin/react-components/ListBox.js';
import { Select } from '@vaadin/react-components/Select.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const people = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 4 }).then(({ people: items }) => {
      people.value = items;
    });
  }, []);

  return (
    // tag::snippet[]
    <Select label="Choose doctor">
      <ListBox>
        {people.value.map((person) => (
          <Item value={String(person.id)} key={person.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={person.pictureUrl}
                alt={`Portrait of ${person.firstName} ${person.lastName}`}
                style={{ width: 'var(--lumo-size-m)', marginRight: 'var(--lumo-space-s)' }}
              />

              <div>
                {person.firstName} {person.lastName}
                <div
                  style={{
                    fontSize: 'var(--lumo-font-size-s)',
                    color: 'var(--lumo-secondary-text-color)',
                  }}
                >
                  {person.profession}
                </div>
              </div>
            </div>
          </Item>
        ))}
      </ListBox>
    </Select>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
