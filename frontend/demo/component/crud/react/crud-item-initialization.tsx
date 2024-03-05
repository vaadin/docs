import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Crud, type CrudNewEvent } from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  const [editedItem, setEditedItem] = useState<Partial<Person> | undefined>(undefined);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  // tag::snippet[]
  const handleNewItem = (event: CrudNewEvent) => {
    // Cancel event to allow setting a custom item instance
    event.preventDefault();
    setEditedItem({
      email: '@vaadin.com',
      profession: 'Developer',
    });
  };

  return (
    <Crud
      include="firstName, lastName, email, profession"
      items={items}
      editedItem={editedItem}
      onNew={handleNewItem}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
