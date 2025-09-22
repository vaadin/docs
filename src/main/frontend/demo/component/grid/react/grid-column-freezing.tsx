import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function nameRenderer({ item: person }: { item: Person }) {
  return (
    <>
      {person.firstName} {person.lastName}
    </>
  );
}

function editRenderer() {
  return <Button theme="tertiary-inline">Edit</Button>;
}

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    <Grid items={items.value}>
      {/* tag::snippet1[] */}
      <GridColumn frozen header="Name" autoWidth flexGrow={0} renderer={nameRenderer} />
      {/* end::snippet1[] */}

      <GridColumn path="email" autoWidth />
      <GridColumn path="address.phone" autoWidth />
      <GridColumn path="profession" autoWidth />
      <GridColumn path="address.street" autoWidth />

      {/* tag::snippet2[] */}

      <GridColumn frozenToEnd autoWidth flexGrow={0} renderer={editRenderer}></GridColumn>
      {/* end::snippet2[] */}
    </Grid>
  );
}

export default reactExample(Example); // hidden-source-line
