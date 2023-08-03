import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridSortColumn } from '@hilla/react-components/GridSortColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) =>
      setItems(
        people.map((person) => ({
          ...person,
          displayName: `${person.firstName} ${person.lastName}`,
        }))
      )
    );
  }, []);

  return (
    // tag::snippet[]
    <Grid items={items} multiSort multiSortPriority="append">
      <GridSortColumn path="id" />
      <GridSortColumn path="displayName" header="Name" />
      <GridSortColumn path="email" />
      <GridSortColumn path="profession" />
      <GridSortColumn path="birthday" />
    </Grid>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
