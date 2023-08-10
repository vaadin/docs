import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef, useState } from 'react';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';
import { Grid, type GridElement } from '@hilla/react-components/Grid.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { GridColumn } from '@hilla/react-components/GridColumn.js';

function Example() {
  const [gridItems, setGridItems] = useState<Person[]>([]);
  const gridRef = useRef<GridElement>(null);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => setGridItems(people));

    const grid = gridRef.current;
    if (grid) {
      // Workaround: Prevent opening context menu on header row.
      // @ts-expect-error vaadin-contextmenu isn't a GridElement event.
      grid.addEventListener('vaadin-contextmenu', (e) => {
        if (grid.getEventContext(e).section !== 'body') {
          e.stopPropagation();
        }
      });
    }
  }, []);

  // tag::snippet[]
  const items = [{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }];

  return (
    <ContextMenu items={items}>
      <Grid allRowsVisible items={gridItems} ref={gridRef}>
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
        <GridColumn header="Phone number" path="address.phone" />
      </Grid>
    </ContextMenu>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
