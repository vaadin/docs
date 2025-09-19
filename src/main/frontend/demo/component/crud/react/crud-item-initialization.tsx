import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Crud, type CrudNewEvent } from '@vaadin/react-components-pro/Crud.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const editedItem = useSignal<Partial<Person> | undefined>(undefined);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  // tag::snippet[]
  const handleNewItem = (event: CrudNewEvent) => {
    // Cancel event to allow setting a custom item instance
    event.preventDefault();
    editedItem.value = {
      email: '@vaadin.com',
      profession: 'Developer',
    };
  };

  return (
    <Crud
      include="firstName, lastName, email, profession"
      items={items.value}
      editedItem={editedItem.value}
      onNew={handleNewItem}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
