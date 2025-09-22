import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridColumnGroup } from '@vaadin/react-components/GridColumnGroup.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

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
    <Grid items={items.value} columnReorderingAllowed>
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
