import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid, type GridElement } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { SplitLayout } from '@vaadin/react-components/SplitLayout.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
const BREAKPOINT_PX = 500;

const employeeRenderer = ({ item: person }: { item: Person }) => (
  <>
    <b>
      {person.firstName} {person.lastName}
    </b>
    <br />
    <small>{person.email}</small>
  </>
);

const nameRenderer = ({ item: person }: { item: Person }) => (
  <>
    {person.firstName} {person.lastName}
  </>
);

function Example() {
  useSignals(); // hidden-source-line
  const gridRef = useRef<GridElement>(null);
  const items = useSignal<Person[]>([]);
  const wide = useSignal(true);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  // Toggles the columns whenever the grid is resized
  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      wide.value = entry.contentRect.width >= BREAKPOINT_PX;
    });
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  return (
    // end::snippet[]
    <SplitLayout>
      {/* tag::snippet[] */}
      <Grid items={items.value} ref={gridRef} style={{ width: '100%' }}>
        {/* A single column that combines the content when the grid is narrow */}
        <GridColumn header="Employee" hidden={wide.value} renderer={employeeRenderer} />
        {/* Separate columns for when the grid is wide */}
        <GridColumn header="Name" hidden={!wide.value} renderer={nameRenderer} />
        <GridColumn path="profession" hidden={!wide.value} />
        <GridColumn path="email" hidden={!wide.value} />
      </Grid>
      {/* end::snippet[] */}
      <div></div>
    </SplitLayout>
    // tag::snippet[]
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
