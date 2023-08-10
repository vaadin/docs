import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridColumnGroup } from '@hilla/react-components/GridColumnGroup.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  // tag::snippet[]
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <Grid items={items} columnReorderingAllowed>
      <GridColumnGroup header="Name">
        <GridColumn path="firstName" resizable />
        <GridColumn path="lastName" resizable />
      </GridColumnGroup>

      <GridColumnGroup header="Address">
        <GridColumn path="address.street" resizable />
        <GridColumn path="address.city" resizable />
        <GridColumn path="address.zip" resizable />
        <GridColumn path="address.state" resizable />
      </GridColumnGroup>
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
