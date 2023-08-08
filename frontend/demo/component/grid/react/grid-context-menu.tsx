import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef, useState } from 'react';
import { Grid, type GridElement } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import {
  ContextMenu,
  type ContextMenuElement,
  type ContextMenuRendererContext,
} from '@hilla/react-components/ContextMenu.js';
import { Item } from '@hilla/react-components/Item.js';
import { ListBox } from '@hilla/react-components/ListBox.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  const gridRef = useRef<GridElement>(null);

  function onContextMenu(e: React.MouseEvent) {
    if (!gridRef.current) {
      return;
    }
    // Prevent opening context menu on header row.
    if (gridRef.current.getEventContext(e.nativeEvent).section !== 'body') {
      e.stopPropagation();
    }
  }

  // tag::snippet[]
  const renderMenu = ({
    context,
  }: Readonly<{
    context: ContextMenuRendererContext;
    original: ContextMenuElement;
  }>) => {
    if (!gridRef.current) {
      return null;
    }

    const { sourceEvent } = context.detail as { sourceEvent: Event };
    const grid = gridRef.current;

    const eventContext = grid.getEventContext(sourceEvent);
    const person = eventContext.item;

    const clickHandler = (action: string) => () => {
      console.log(`${action}: ${person.firstName} ${person.lastName}`);
    };

    return (
      <ListBox>
        <Item onClick={clickHandler('Edit')}>Edit</Item>
        <Item onClick={clickHandler('Delete')}>Delete</Item>
        <hr />
        <Item onClick={clickHandler('Email')}>Email ({person.email})</Item>
        <Item onClick={clickHandler('Call')}>Call ({person.address.phone})</Item>
      </ListBox>
    );
  };

  return (
    <ContextMenu renderer={renderMenu}>
      <Grid items={items} ref={gridRef} onContextMenu={onContextMenu}>
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
        <GridColumn path="profession" />
      </Grid>
    </ContextMenu>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
