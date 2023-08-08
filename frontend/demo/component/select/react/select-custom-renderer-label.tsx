import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Select } from '@hilla/react-components/Select.js';
import { ListBox } from '@hilla/react-components/ListBox.js';
import { Item } from '@hilla/react-components/Item.js';
import '@vaadin/avatar';
import '@vaadin/horizontal-layout';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

const formatPersonFullName = (person: Person) => `${person.firstName} ${person.lastName}`;

function Example() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people: items }) => setPeople(items));
  }, []);

  return (
    // tag::snippet[]
    <Select label="Assignee">
      <ListBox>
        {people.map((person) => (
          // Use the label attribute to display full name of the person as selected value label
          <Item
            value={String(person.id)}
            key={person.id}
            {...{ label: formatPersonFullName(person) }}
          >
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
