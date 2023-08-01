import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef, useState } from 'react';
import { Crud, type CrudNewEvent } from '@hilla/react-components/Crud.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const crudRef = useRef(null);
  const [items, setItems] = useState<Person[]>([]);
  const [editedItem, setEditedItem] = useState<Partial<Person> | undefined>(undefined);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  const handleNewItem = (event: CrudNewEvent) => {
    event.preventDefault();
    setEditedItem({
      email: '@vaadin.com',
      profession: 'Developer',
    });
  };

  return (
    <>
      {/* tag::snippet[] */}
      <Crud
        include="firstName, lastName, email, profession"
        items={items}
        editedItem={editedItem}
        onNew={handleNewItem}
        ref={crudRef}
      >
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email">{({ item }) => <EmailField value={item.email} />}</GridColumn>
        <GridColumn path="profession" />
      </Crud>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
