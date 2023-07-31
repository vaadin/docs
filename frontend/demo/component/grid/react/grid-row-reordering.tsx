import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { DragStartEvent, DropEvent } from '@hilla/react-components/GridEvents';

function Example() {
  const [items, setItems] = React.useState<Person[]>([]);
  const [draggedItem, setDraggedItem] = React.useState<Person | undefined>(undefined);

  React.useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  function handleDragStart(event: DragStartEvent<Person>): void {
    setDraggedItem(event.detail.draggedItems[0]);
  }

  function handleDragEnd(): void {
    setDraggedItem(undefined);
  }

  function handleDrop(event: DropEvent<Person>): void {
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
    <>
      {/* tag::snippet[] */}
      <Grid
        items={items}
        draggable
        dropMode="between"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
      >
        <GridColumn
          header="Image"
          flexGrow={0}
          autoWidth
          // @ts-ignore - `renderer` missing in current typings
        >
          {(person) => (
            <Avatar
              img={person.pictureUrl}
              name={`${person.firstName} ${person.lastName}`}
              alt="User avatar"
            />
          )}
        </GridColumn>

        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
      </Grid>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
