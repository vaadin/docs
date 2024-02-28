import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { Grid, type GridElement } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { Button } from '@vaadin/react-components/Button.js';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const gridRef = useRef<GridElement>(null);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });

    // Workaround for https://github.com/vaadin/react-components/issues/129
    setTimeout(() => {
      gridRef.current?.recalculateColumnWidths();
      gridRef.current?.scrollToIndex(1);
      gridRef.current?.scrollToIndex(0);
    }, 100);
  }, []);

  return (
    <>
      <Grid items={items.value} ref={gridRef}>
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
    </>
  );
}

export default reactExample(Example); // hidden-source-line
