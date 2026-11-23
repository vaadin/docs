import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid, type GridDragStartEvent } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridSelectionColumn } from '@vaadin/react-components/GridSelectionColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  // tag::snippet[]
  const selectedItems = useSignal<Person[]>([]);
  const draggedItems = useSignal<Person[]>([]);

  const startDraggingItems = (event: GridDragStartEvent<Person>) => {
    // The event has only the dragged rows that are visible
    const { draggedItems: visibleItems, setDraggedItemsCount } = event.detail;
    // Dragging a selected row drags the whole selection
    const selectionDragged = selectedItems.value.includes(visibleItems[0]);
    draggedItems.value = selectionDragged ? selectedItems.value : visibleItems;
    if (draggedItems.value.length > 1) {
      // Show the number of all dragged rows in the drag image
      setDraggedItemsCount(draggedItems.value.length);
    }
  };

  return (
    <Grid
      items={items.value}
      rowsDraggable
      selectedItems={selectedItems.value}
      onSelectedItemsChanged={(event) => {
        selectedItems.value = event.detail.value;
      }}
      onGridDragstart={startDraggingItems}
    >
      <GridSelectionColumn />
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
