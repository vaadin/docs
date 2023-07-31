import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
// import Person interface here

function Example() {
  const gridRef = useRef(null);
  const [items, setItems] = useState([]);
  const [eventSummary, setEventSummary] = useState('');

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  const handleCellFocus = (event) => {
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
        <TextArea label="Cell focus event information" readOnly value={eventSummary} />
      </div>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
