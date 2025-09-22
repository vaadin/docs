import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid, type GridDragStartEvent } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
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

function fullNameRenderer({ item: person }: { item: Person }) {
  return `${person.firstName} ${person.lastName}`;
}

function Example() {
  useSignals(); // hidden-source-line
  const draggedItem = useSignal<Person | undefined>(undefined);
  const grid1Items = useSignal<Person[]>([]);
  const grid2Items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 10 }).then(({ people }) => {
      grid1Items.value = people.slice(0, 5);
      grid2Items.value = people.slice(5);
    });
  }, []);

  // tag::snippet[]
  const startDraggingItem = (event: GridDragStartEvent<Person>) => {
    draggedItem.value = event.detail.draggedItems[0];
  };

  const clearDraggedItem = () => {
    draggedItem.value = undefined;
  };

  return (
    <div style={gridContainerStyle}>
      <Grid
        items={grid1Items.value}
        rowsDraggable
        dropMode={draggedItem.value ? 'on-grid' : undefined}
        style={gridStyle}
        onGridDragstart={startDraggingItem}
        onGridDragend={clearDraggedItem}
        onGridDrop={() => {
          const draggedPerson = draggedItem.value!;
          const draggedItemIndex = grid2Items.value.indexOf(draggedPerson);
          if (draggedItemIndex >= 0) {
            const updatedGrid2Items = grid2Items.value.filter(
              (_, index) => index !== draggedItemIndex
            );
            grid2Items.value = updatedGrid2Items;
            grid1Items.value = [...grid1Items.value, draggedPerson];
          }
        }}
      >
        <GridColumn header="Full name" renderer={fullNameRenderer}></GridColumn>

        <GridColumn path="profession" />
      </Grid>

      <Grid
        items={grid2Items.value}
        rowsDraggable
        dropMode={draggedItem.value ? 'on-grid' : undefined}
        style={gridStyle}
        onGridDragstart={startDraggingItem}
        onGridDragend={clearDraggedItem}
        onGridDrop={() => {
          const draggedPerson = draggedItem.value!;
          const draggedItemIndex = grid1Items.value.indexOf(draggedPerson);
          if (draggedItemIndex >= 0) {
            const updatedGrid1Items = grid1Items.value.filter(
              (_, index) => index !== draggedItemIndex
            );
            grid1Items.value = updatedGrid1Items;
            grid2Items.value = [...grid2Items.value, draggedPerson];
          }
        }}
      >
        <GridColumn header="Full name" renderer={fullNameRenderer} />

        <GridColumn path="profession" />
      </Grid>
    </div>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
