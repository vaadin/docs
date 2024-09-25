import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  ContextMenu,
  type ContextMenuElement,
  type ContextMenuRendererContext,
} from '@vaadin/react-components/ContextMenu.js';
import { Grid, type GridElement } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { Item } from '@vaadin/react-components/Item.js';
import { ListBox } from '@vaadin/react-components/ListBox.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const gridRef = useRef<GridElement>(null);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      // Workaround: Prevent opening context menu on header row.
      // @ts-expect-error vaadin-contextmenu isn't a GridElement event.
      grid.addEventListener('vaadin-contextmenu', (e) => {
        if (grid.getEventContext(e).section !== 'body') {
          e.stopPropagation();
        }
      });
    }
  }, [gridRef.current]);

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
      <Grid items={items.value} ref={gridRef}>
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
