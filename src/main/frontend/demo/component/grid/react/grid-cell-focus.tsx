import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid, type GridCellFocusEvent, type GridElement } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { TextArea } from '@vaadin/react-components/TextArea.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const gridRef = useRef<GridElement>(null);
  const items = useSignal<Person[]>([]);
  const eventSummary = useSignal('');

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  const handleCellFocus = (event: GridCellFocusEvent<Person>) => {
    if (!gridRef.current) {
      return;
    }
    const eventContext = gridRef.current.getEventContext(event);
    const section = eventContext.section ?? 'Not available';
    const row = eventContext.index ?? 'Not available';
    const column = eventContext.column?.path ?? 'Not available';
    const person = eventContext.item;
    const fullName =
      person?.firstName && person?.lastName
        ? `${person.firstName} ${person.lastName}`
        : 'Not available';

    eventSummary.value = `Section: ${section}\nRow: ${row}\nColumn: ${column}\nPerson: ${fullName}`;
  };

  return (
    <>
      <Grid
        className="force-focus-outline"
        items={items.value}
        onCellFocus={handleCellFocus}
        ref={gridRef}
      >
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
        <GridColumn path="profession" />
      </Grid>

      <div>
        <TextArea
          label="Cell focus event information"
          readonly
          value={eventSummary.value}
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
