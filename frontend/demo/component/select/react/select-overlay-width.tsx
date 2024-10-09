import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Select, type SelectItem } from '@vaadin/react-components/Select.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

const formatPersonFullName = (person: Person) => `${person.firstName} ${person.lastName}`;

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<SelectItem[]>([]);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => {
      items.value = people.map((person) => ({
        value: formatPersonFullName(person),
        label: `${person.profession} - ${formatPersonFullName(person)}`,
      }));
    });
  }, []);

  return (
    // tag::snippet[]
    <Select
      style={{ '--vaadin-select-overlay-width': '350px' }}
      label="Employee"
      items={items.value}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
