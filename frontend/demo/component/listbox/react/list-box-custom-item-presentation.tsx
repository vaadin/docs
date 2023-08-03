import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState, useEffect } from 'react';
import { ListBox } from '@hilla/react-components/ListBox.js';
import { Item } from '@hilla/react-components/Item.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [selectedValues, setSelectedValues] = useState([0, 2]);
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => {
      setItems(people);
    });
  }, []);

  return (
    // tag::snippet[]
    <ListBox
      multiple
      selectedValues={selectedValues}
      onSelectedValuesChanged={(e) => setSelectedValues(e.detail.value)}
    >
      {items.map((person) => (
        <Item
          value={String(items.indexOf(person))}
          style={{ lineHeight: 'var(--lumo-line-height-m)' }}
          key={items.indexOf(person)}
        >
          <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing">
            <Avatar img={person.pictureUrl} name={`${person.firstName} ${person.lastName}`} />
            <VerticalLayout>
              <span>
                {person.firstName} {person.lastName}
              </span>
              <span
                style={{
                  color: 'var(--lumo-secondary-text-color)',
                  fontSize: 'var(--lumo-font-size-s)',
                }}
              >
                {person.profession}
              </span>
            </VerticalLayout>
          </HorizontalLayout>
        </Item>
      ))}
    </ListBox>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
