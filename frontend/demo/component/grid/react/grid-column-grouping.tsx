import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { GridColumnGroup } from '@hilla/react-components/GridColumnGroup.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';

function Example() {
  // tag::snippet[]
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <Grid items={items}>
      <GridColumnGroup header="Name">
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
      </GridColumnGroup>

      <GridColumnGroup header="Address">
        <GridColumn path="address.street" />
        <GridColumn path="address.city" />
        <GridColumn path="address.zip" />
        <GridColumn path="address.state" />
      </GridColumnGroup>
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
