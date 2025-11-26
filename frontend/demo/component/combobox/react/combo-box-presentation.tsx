import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import type { ComboBoxFilterChangedEvent } from '@vaadin/react-components/ComboBox.js';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
function renderPerson({ item: person }: { item: Person }) {
  return (
    <div style={{ display: 'flex' }}>
      <img
        style={{ height: '2.25rem', marginRight: '0.5rem' }}
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
  );
}

function Example() {
  useSignals(); // hidden-source-line
  const allItems = useSignal<Person[]>([]);
  const filteredItems = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      const items = people.map((person) => ({
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      }));
      allItems.value = items;
      filteredItems.value = items;
    });
  }, []);

  const filterChanged = (e: ComboBoxFilterChangedEvent) => {
    const filter = e.detail.value;
    filteredItems.value = allItems.value.filter(({ firstName, lastName, profession }) =>
      `${firstName} ${lastName} ${profession}`.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <ComboBox
      label="Choose doctor"
      itemLabelPath="displayName"
      filteredItems={filteredItems.value}
      style={{ '--vaadin-combo-box-overlay-width': '16em' } as React.CSSProperties}
      onFilterChanged={filterChanged}
      renderer={renderPerson}
    />
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
