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
    const {
      section,
      index,
      column,
      item: { firstName, lastName },
    } = gridRef.current.getEventContext(event);

    const summary = `Section: ${section ?? 'Not available'}
    Row: ${index ?? 'Not available'}
    Column: ${column?.path ?? 'Not available'}
    Person: ${firstName && lastName ? `${firstName} ${lastName}` : 'Not available'}`;

    setEventSummary(summary);
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
        <TextArea label="Cell focus event information" readonly value={eventSummary} />
      </div>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
