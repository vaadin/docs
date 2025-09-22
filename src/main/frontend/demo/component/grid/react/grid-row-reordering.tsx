import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import {
  Grid,
  type GridDragStartEvent,
  type GridDropEvent,
} from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function avatarRenderer({ item }: { item: Person }) {
  return <Avatar img={item.pictureUrl} name={`${item.firstName} ${item.lastName}`} />;
}

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const draggedItem = useSignal<Person | undefined>(undefined);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  // tag::snippet[]
  function handleDragStart(event: GridDragStartEvent<Person>): void {
    draggedItem.value = event.detail.draggedItems[0];
  }

  function handleDragEnd(): void {
    draggedItem.value = undefined;
  }

  function handleDrop(event: GridDropEvent<Person>): void {
    const { dropTargetItem, dropLocation } = event.detail;
    // Only act when dropping on another item
    if (draggedItem.value && dropTargetItem !== draggedItem.value) {
      // Remove the item from its previous position
      const draggedItemIndex = items.value.indexOf(draggedItem.value);
      items.value.splice(draggedItemIndex, 1);
      // Re-insert the item at its new position
      const dropIndex = items.value.indexOf(dropTargetItem) + (dropLocation === 'below' ? 1 : 0);
      items.value.splice(dropIndex, 0, draggedItem.value);
      // Re-assign the array to refresh the grid
      items.value = [...items.value];
    }
  }

  return (
    <Grid
      items={items.value}
      rowsDraggable
      dropMode={draggedItem.value ? 'between' : undefined}
      onGridDragstart={handleDragStart}
      onGridDragend={handleDragEnd}
      onGridDrop={handleDrop}
    >
      <GridColumn header="Image" flexGrow={0} autoWidth renderer={avatarRenderer} />

      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
