import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { ContextMenu } from '@vaadin/react-components/ContextMenu.js';
import { Grid, type GridElement } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal([{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }]);
  const gridItems = useSignal<Person[]>([]);
  const gridRef = useRef<GridElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      // Workaround: Prevent opening context menu on header row.
      grid.addEventListener('click', (e) => {
        if (grid.getEventContext(e).section !== 'body') {
          e.stopPropagation();
        }
      });
    }
  }, [gridRef.current]);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => {
      gridItems.value = people;
    });
  }, []);

  // tag::snippet[]
  return (
    <ContextMenu openOn="click" items={items.value}>
      <Grid allRowsVisible items={gridItems.value} ref={gridRef}>
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
