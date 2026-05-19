import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { ContextMenu, Tooltip } from '@vaadin/react-components';
import { Grid, type GridElement } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const gridItems = useSignal<Person[]>([]);
  const gridRef = useRef<GridElement>(null);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => {
      gridItems.value = people;
    });
  }, []);

  useEffect(() => {
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
  }, [gridRef.current]);

  // tag::snippet[]
  const items = [
    { text: 'Edit', tooltip: 'Edit selected person' },
    {
      text: 'Share',
      children: [
        { text: 'Copy link', tooltip: 'Copy a shareable link to the clipboard' },
        {
          text: 'Email',
          tooltip: 'Send the contact details by email',
          tooltipPosition: 'end',
        },
      ],
    },
  ];

  return (
    <ContextMenu items={items}>
      <Tooltip slot="tooltip" />
      <Grid allRowsVisible items={gridItems.value} ref={gridRef}>
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
      </Grid>
    </ContextMenu>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
