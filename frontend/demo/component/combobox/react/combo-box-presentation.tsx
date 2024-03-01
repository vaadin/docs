import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { ComboBox, type ComboBoxFilterChangedEvent } from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [allItems, setAllItems] = useState<Person[]>([]);
  const [filteredItems, setFilteredItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      const items = people.map((person) => ({
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      }));
      setAllItems(items);
      setFilteredItems(items);
    });
  }, []);

  const filterChanged = (e: ComboBoxFilterChangedEvent) => {
    const filter = e.detail.value;
    setFilteredItems(
      allItems.filter(({ firstName, lastName, profession }) =>
        `${firstName} ${lastName} ${profession}`.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  return (
    // tag::snippet[]
    <ComboBox
      label="Choose doctor"
      itemLabelPath="displayName"
      filteredItems={filteredItems}
      style={{ '--vaadin-combo-box-overlay-width': '16em' } as React.CSSProperties}
      onFilterChanged={filterChanged}
      renderer={({ item: person }) => (
        <div style={{ display: 'flex' }}>
          <img
            style={{ height: 'var(--lumo-size-m)', marginRight: 'var(--lumo-space-s)' }}
            src={person.pictureUrl}
            alt={`Portrait of ${person.firstName} ${person.lastName}`}
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
      )}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
