import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people.map((person) => ({
        ...person,
        displayName: `${person.profession} - ${person.firstName} ${person.lastName}`,
      }));
    });
  }, []);

  return (
    // tag::snippet[]
    <ComboBox
      style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties}
      label="Employee"
      itemLabelPath="displayName"
      itemValuePath="id"
      items={items.value}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
