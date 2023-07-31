import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Crud } from '@hilla/react-components/Crud.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  const [editedItem, setEditedItem] = useState<Person | undefined>();

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  function onEditedItemChanged(event: any) {
    setEditedItem(event.detail.value);
  }

  function onDblClick(e: MouseEvent) {
    const target = e.currentTarget as Grid<Person>;
    setEditedItem(target.getEventContext(e).item);
  }

  return (
    <>
      {/* tag::snippet[] */}
      <Crud
        include={['firstName', 'lastName', 'email', 'profession']}
        items={items}
        editedItem={editedItem}
        onEditedItemChanged={onEditedItemChanged}
      >
        <Grid slot="grid" onDblClick={onDblClick}>
          <GridColumn path="firstName" header="First name" />
          <GridColumn path="lastName" header="Last name" />
          <GridColumn path="email" header="Email" />
          <GridColumn path="profession" header="Profession" />
        </Grid>
      </Crud>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
