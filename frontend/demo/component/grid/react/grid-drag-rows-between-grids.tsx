import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { gridDragStartHandler, GridDragStartEvent } from '@hilla/react-components/GridDragStartEvent.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

interface ExampleProps {
  count: number;
}

function Example({ count }: ExampleProps) {
  const [draggedItem, setDraggedItem] = useState<Person>();
  const [grid1Items, setGrid1Items] = useState<Person[]>([]);
  const [grid2Items, setGrid2Items] = useState<Person[]>([]);

  React.useEffect(() => {
    getPeople({ count }).then(({ people }) => {
      setGrid1Items(people.slice(0, 5));
      setGrid2Items(people.slice(5));
    });
  }, []);

  const startDraggingItem: gridDragStartHandler = (event: GridDragStartEvent<Person>) => {
    setDraggedItem(event.detail.draggedItems[0]);
  };

  return (
    <div className="grids-container">
      <Grid
        items={grid1Items}
        dragSourceConfig={{
          draggable: true,
          dropTargetConfigs: [
            {
              dropMode: 'on-grid',
              onDrop: () => {
                const draggedPerson = draggedItem!;
                const draggedItemIndex = grid2Items.findIndex((person) => person === draggedPerson);
                if (draggedItemIndex >= 0) {
                  const updatedGrid2Items = [...grid2Items];
                  updatedGrid2Items.splice(draggedItemIndex, 1);
                  setGrid2Items(updatedGrid2Items);
                  setGrid1Items([...grid1Items, draggedPerson]);
                }
              },
            },
          ],
        }}
        dragStartHandler={startDraggingItem}
        dragEndHandler={() => setDraggedItem(undefined)}
      >
        <GridColumn<Person> header="Full name" renderer={({ data }) => <>{data.firstName} {data.lastName}</>} />
        <GridColumn<Person> path="profession" />
      </Grid>

      <Grid
        items={grid2Items}
        dragSourceConfig={{
          draggable: true,
          dropTargetConfigs: [
            {
              dropMode: 'on-grid',
              onDrop: () => {
                const draggedPerson = draggedItem!;
                const draggedItemIndex = grid1Items.findIndex((person) => person === draggedPerson);
                if (draggedItemIndex >= 0) {
                  const updatedGrid1Items = [...grid1Items];
                  updatedGrid1Items.splice(draggedItemIndex, 1);
                  setGrid1Items(updatedGrid1Items);
                  setGrid2Items([...grid2Items, draggedPerson]);
                }
              },
            },
          ],
        }}
        dragStartHandler={startDraggingItem}
        dragEndHandler={() => setDraggedItem(undefined)}
      >
        <GridColumn<Person> header="Full name" renderer={({ data }) => <>{data.firstName} {data.lastName}</>} />
        <GridColumn<Person> path="profession" />
      </Grid>
    </div>
  );
}

export default reactExample(Example);
