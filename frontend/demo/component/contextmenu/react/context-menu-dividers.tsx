import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef, useState } from 'react';
import { Grid, type GridElement } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items] = useState([{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }]);
  const [gridItems, setGridItems] = useState<Person[]>([]);
  const gridRef = useRef<GridElement>(null);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => setGridItems(people));

    const grid = gridRef.current;
    if (grid) {
      // Prevent opening context menu on header row.
      // @ts-expect-error vaadin-contextmenu isn't a GridElement event.
      grid.addEventListener('vaadin-contextmenu', (e) => {
        if (grid.getEventContext(e).section !== 'body') {
          e.stopPropagation();
        }
      });
    }
  }, []);

  return (
    // tag::snippet[]
    <ContextMenu
      items={[
        { text: 'View' },
        { component: 'hr' },
        { text: 'Edit' },
        { text: 'Delete' },
        { component: 'hr' },
        { text: 'Email' },
        { text: 'Call' },
      ]}
    >
      <Grid allRowsVisible items={gridItems} ref={gridRef}>
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
        <GridColumn header="Phone number" path="address.phone" />
      </Grid>
    </ContextMenu>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
