import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Select, type SelectItem } from '@vaadin/react-components/Select.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<SelectItem[]>([]);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => {
      // tag::snippet[]
      items.value = people.map((person) => ({
        label: `${person.firstName} ${person.lastName}`,
        value: `${person.id}`,
      }));
      // end::snippet[]
    });
  }, []);

  return <Select label="Assignee" items={items.value} />;
}

export default reactExample(Example); // hidden-source-line
