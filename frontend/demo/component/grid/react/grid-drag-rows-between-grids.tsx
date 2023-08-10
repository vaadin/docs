import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid, type GridDragStartEvent } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

const gridContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
};

const gridStyle = {
  width: '300px',
  height: '300px',
  marginLeft: '0.5rem',
  marginTop: '0.5rem',
  alignSelf: 'unset',
};

function Example() {
  const [draggedItem, setDraggedItem] = useState<Person>();
  const [grid1Items, setGrid1Items] = useState<Person[]>([]);
  const [grid2Items, setGrid2Items] = useState<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 10 }).then(({ people }) => {
      setGrid1Items(people.slice(0, 5));
      setGrid2Items(people.slice(5));
    });
  }, []);

  // tag::snippet[]
  const startDraggingItem = (event: GridDragStartEvent<Person>) => {
    setDraggedItem(event.detail.draggedItems[0]);
  };

  const clearDraggedItem = () => {
    setDraggedItem(undefined);
  };

  return (
    <div style={gridContainerStyle}>
      <Grid
        items={grid1Items}
        rowsDraggable
        dropMode="on-grid"
        style={gridStyle}
        onGridDragstart={startDraggingItem}
        onGridDragend={clearDraggedItem}
        onGridDrop={() => {
          const draggedPerson = draggedItem!;
          const draggedItemIndex = grid2Items.indexOf(draggedPerson);
          if (draggedItemIndex >= 0) {
            const updatedGrid2Items = grid2Items.filter((_, index) => index !== draggedItemIndex);
            setGrid2Items(updatedGrid2Items);
            setGrid1Items([...grid1Items, draggedPerson]);
          }
        }}
      >
        <GridColumn header="Full name">
          {({ item: person }) => `${person.firstName} ${person.lastName}`}
        </GridColumn>

        <GridColumn path="profession" />
      </Grid>

      <Grid
        items={grid2Items}
        rowsDraggable
        dropMode="on-grid"
        style={gridStyle}
        onGridDragstart={startDraggingItem}
        onGridDragend={clearDraggedItem}
        onGridDrop={() => {
          const draggedPerson = draggedItem!;
          const draggedItemIndex = grid1Items.indexOf(draggedPerson);
          if (draggedItemIndex >= 0) {
            const updatedGrid1Items = grid1Items.filter((_, index) => index !== draggedItemIndex);
            setGrid1Items(updatedGrid1Items);
            setGrid2Items([...grid2Items, draggedPerson]);
          }
        }}
      >
        <GridColumn header="Full name">
          {({ item: person }) => `${person.firstName} ${person.lastName}`}
        </GridColumn>

        <GridColumn path="profession" />
      </Grid>
    </div>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
