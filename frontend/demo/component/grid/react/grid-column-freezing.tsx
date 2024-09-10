import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { Button } from '@vaadin/react-components/Button.js';

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
      <GridColumn frozen header="Name" autoWidth flexGrow={0}>
        {({ item: person }) => (
          <>
            {person.firstName} {person.lastName}
          </>
        )}
      </GridColumn>
      {/* end::snippet1[] */}

      <GridColumn path="email" autoWidth />
      <GridColumn path="address.phone" autoWidth />
      <GridColumn path="profession" autoWidth />
      <GridColumn path="address.street" autoWidth />

      {/* tag::snippet2[] */}

      <GridColumn frozenToEnd autoWidth flexGrow={0}>
        {() => <Button theme="tertiary-inline">Edit</Button>}
      </GridColumn>
      {/* end::snippet2[] */}
    </Grid>
  );
}

export default reactExample(Example); // hidden-source-line
