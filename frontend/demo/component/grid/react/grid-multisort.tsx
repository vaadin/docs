import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridSortColumn } from '@vaadin/react-components/GridSortColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people.map((person) => ({
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      }));
    });
  }, []);

  return (
    // tag::snippet[]
    <Grid items={items.value} multiSort multiSortPriority="append">
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
