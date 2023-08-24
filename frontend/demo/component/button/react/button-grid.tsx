import { Button } from '@hilla/react-components/Button.js'; // hidden-source-line
import React from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridSelectionColumn } from '@hilla/react-components/GridSelectionColumn.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { reactExample } from 'Frontend/demo/react-example';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { useEffect, useState } from 'react';

function Example() {
  // tag::snippet[]
  const [items, setItems] = useState<Person[]>([]);
  const [selectedItems, setSelectedItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <VerticalLayout theme="spacing" style={{ alignItems: 'stretch' }}>
      <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
        <h2 style={{ margin: '0 auto 0 0' }}>Users </h2>
        <Button>Add user</Button>
      </HorizontalLayout>
      <Grid
        items={items}
        selectedItems={selectedItems}
        onSelectedItemsChanged={({ detail: { value } }) => setSelectedItems(value)}
      >
        <GridSelectionColumn />
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
      </Grid>

      <HorizontalLayout theme="spacing">
        <Button disabled={selectedItems.length !== 1}>Edit profile</Button>
        <Button disabled={selectedItems.length !== 1}>Manage permissions</Button>
        <Button disabled={selectedItems.length !== 1}>Reset password</Button>
        <Button
          theme="error"
          disabled={selectedItems.length === 0}
          style={{ marginInlineStart: 'auto' }}
        >
          Delete
        </Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
