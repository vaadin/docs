import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridSelectionColumn } from '@vaadin/react-components/GridSelectionColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    // tag::snippet[]
    <Grid items={items.value}>
      <GridSelectionColumn />
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
    </Grid>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
