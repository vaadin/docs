import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState, useRef } from 'react';
import { Grid, type GridCellFocusEvent, type GridElement } from '@hilla/react-components/Grid.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { GridColumn } from '@hilla/react-components/GridColumn.js';

function Example() {
  const gridRef = useRef<GridElement>(null);
  const [items, setItems] = useState<Person[]>([]);
  const [eventSummary, setEventSummary] = useState('');

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  const handleCellFocus = (event: GridCellFocusEvent<Person>) => {
    if (!gridRef.current) {
      return;
    }
    const eventContext = gridRef.current.getEventContext(event);
    const section = eventContext.section ?? 'Not available';
    const row = eventContext.index != null ? eventContext.index : 'Not available';
    const column = eventContext.column?.path ?? 'Not available';
    const person = eventContext.item;
    const fullName =
      person?.firstName && person?.lastName
        ? `${person.firstName} ${person.lastName}`
        : 'Not available';

    setEventSummary(`Section: ${section}\nRow: ${row}\nColumn: ${column}\nPerson: ${fullName}`);
  };

  return (
    <>
      {/* tag::snippet[] */}
      <Grid
        className="force-focus-outline"
        items={items}
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
          value={eventSummary}
          style={{ width: '100%' }}
        />
      </div>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
