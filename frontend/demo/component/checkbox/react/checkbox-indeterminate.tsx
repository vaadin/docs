import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { CheckboxGroup } from '@vaadin/react-components/CheckboxGroup.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const selectedIds = useSignal<string[]>([]);

  useEffect(() => {
    getPeople({ count: 3 }).then(({ people }) => {
      items.value = people;
      selectedIds.value = [String(people[0].id), String(people[2].id)];
    });
  }, []);

  return (
    <VerticalLayout theme="spacing">
      <Checkbox
        label="Notify users"
        checked={selectedIds.value.length === items.value.length}
        indeterminate={
          selectedIds.value.length > 0 && selectedIds.value.length < items.value.length
        }
        onChange={(e) => {
          selectedIds.value = e.target.checked
            ? items.value.map((person) => String(person.id))
            : [];
        }}
      />

      <CheckboxGroup
        label="Users to notify"
        theme="vertical"
        value={selectedIds.value}
        onValueChanged={(event) => {
          selectedIds.value = event.detail.value;
        }}
      >
        {items.value.map((person) => (
          <Checkbox
            key={person.id}
            value={String(person.id)}
            label={`${person.firstName} ${person.lastName}`}
          />
        ))}
      </CheckboxGroup>
    </VerticalLayout>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
