import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { CheckboxGroup } from '@hilla/react-components/CheckboxGroup.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

// tag::snippet[]
function Example() {
  const [items, setItems] = useState<Person[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    getPeople({ count: 3 }).then(({ people }) => {
      setItems(people);
      setSelectedIds([String(people[0].id), String(people[2].id)]);
    });
  }, []);

  return (
    <VerticalLayout theme="spacing">
      <Checkbox
        label="Notify users"
        checked={selectedIds.length === items.length}
        indeterminate={selectedIds.length > 0 && selectedIds.length < items.length}
        onChange={(e) => {
          // TODO: This doesn't currently invoke
          setSelectedIds(e.currentTarget.checked ? items.map((person) => String(person.id)) : []);
        }}
      />

      <CheckboxGroup
        label="Users to notify"
        theme="vertical"
        value={selectedIds}
        onValueChanged={(event) => {
          setSelectedIds(event.detail.value);
        }}
      >
        {items.map((person) => (
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

export default reactExample(Example);
