import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Grid } from '@vaadin/react-components/Grid.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { GridColumnGroup } from '@vaadin/react-components/GridColumnGroup.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    <Grid items={items.value}>
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
