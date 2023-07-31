import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { SyntheticEvent, useRef } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';
import { Item } from '@hilla/react-components/Item.js';
import { ListBox } from '@hilla/react-components/ListBox.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const gridRef = useRef<HTMLGridElement>(null);
  const renderMenu = (event: SyntheticEvent, menu: HTMLDivElement) => {
    const { sourceEvent } = event.nativeEvent as PointerEvent;
    const grid = menu.firstElementChild as Grid<Person>;

    const eventContext = grid.getEventContext(sourceEvent);
    const person = eventContext.item!;

    const clickHandler = (action: string) => () => {
      // console.log(`${action}: ${person.firstName} ${person.lastName}`);
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
      <Grid items={getPeople().people} ref={gridRef} onContextmenu={onContextMenu}>
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
        <GridColumn path="profession" />
      </Grid>
    </ContextMenu>
  );
}

function onContextMenu(e: React.MouseEvent<HTMLElement, MouseEvent>) {
  // Prevent opening context menu on header row.
  if ((e.currentTarget as HTMLGridElement).getEventContext(e.nativeEvent).section !== 'body') {
    e.stopPropagation();
  }
}

export default reactExample(Example); // hidden-source-line
