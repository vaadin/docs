import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState, useRef } from 'react';
import { Grid, type GridElement } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  const gridRef = useRef<GridElement>(null);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));

    // Workaround for https://github.com/vaadin/react-components/issues/129
    setTimeout(() => {
      gridRef.current?.recalculateColumnWidths();
      gridRef.current?.scrollToIndex(1);
      gridRef.current?.scrollToIndex(0);
    }, 100);
  }, []);

  return (
    <>
      {/* tag::snippet1[] */}
      <Grid items={items} ref={gridRef}>
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
