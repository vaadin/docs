import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Grid, type GridDropEvent, type GridDragStartEvent } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = React.useState<Person[]>([]);
  const [draggedItem, setDraggedItem] = React.useState<Person | undefined>(undefined);

  React.useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  // tag::snippet[]
  function handleDragStart(event: GridDragStartEvent<Person>): void {
    setDraggedItem(event.detail.draggedItems[0]);
  }

  function handleDragEnd(): void {
    setDraggedItem(undefined);
  }

  function handleDrop(event: GridDropEvent<Person>): void {
    const { dropTargetItem, dropLocation } = event.detail;
    // Only act when dropping on another item
    if (draggedItem && dropTargetItem !== draggedItem) {
      // Remove the item from its previous position
      const draggedItemIndex = items.indexOf(draggedItem);
      items.splice(draggedItemIndex, 1);
      // Re-insert the item at its new position
      const dropIndex = items.indexOf(dropTargetItem) + (dropLocation === 'below' ? 1 : 0);
      items.splice(dropIndex, 0, draggedItem);
      // Re-assign the array to refresh the grid
      setItems([...items]);
    }
  }

  return (
    <Grid
      items={items}
      rowsDraggable
      dropMode="between"
      onGridDragstart={handleDragStart}
      onGridDragend={handleDragEnd}
      onGridDrop={handleDrop}
    >
      <GridColumn header="Image" flexGrow={0} autoWidth>
        {({ item: person }) => (
          <Avatar
            img={person.pictureUrl}
            name={`${person.firstName} ${person.lastName}`}
            {...{ alt: 'User avatar' }}
          />
        )}
      </GridColumn>

      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
