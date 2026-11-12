import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { ContextMenu, type ContextMenuElement } from '@vaadin/react-components/ContextMenu.js';
import { Grid, type GridElement } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const gridRef = useRef<GridElement<Person>>(null);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  // tag::snippet[]
  const menuRef = useRef<ContextMenuElement>(null);

  useEffect(() => {
    const grid = gridRef.current!;
    const menu = menuRef.current!;
    let person: Person | undefined;

    const onContextMenu = (e: Event) => {
      const { item, section } = grid.getEventContext(e);
      // Prevent opening context menu on header row.
      if (section !== 'body' || !item) {
        e.stopPropagation();
        return;
      }

      // Set the items for the clicked row before the menu opens.
      person = item;
      menu.items = [
        { text: 'Edit' },
        { text: 'Delete' },
        { component: 'hr' },
        { text: `Email (${item.email})` },
        { text: `Call (${item.address.phone})` },
      ];
    };

    const onItemSelected = (e: CustomEvent<{ value: { text?: string } }>) => {
      console.log(`${e.detail.value.text}: ${person?.firstName} ${person?.lastName}`);
    };

    // @ts-expect-error vaadin-contextmenu isn't a GridElement event.
    grid.addEventListener('vaadin-contextmenu', onContextMenu);
    menu.addEventListener('item-selected', onItemSelected);
    return () => {
      // @ts-expect-error vaadin-contextmenu isn't a GridElement event.
      grid.removeEventListener('vaadin-contextmenu', onContextMenu);
      menu.removeEventListener('item-selected', onItemSelected);
    };
  }, []);

  return (
    <ContextMenu ref={menuRef}>
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
