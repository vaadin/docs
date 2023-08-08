import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useRef, useState } from 'react';
import { ContextMenu, type ContextMenuItem } from '@hilla/react-components/ContextMenu.js';
import { Grid, type GridElement } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { createRoot } from 'react-dom/client';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

function Item({ person }: { person: Person }) {
  return (
    <HorizontalLayout style={{ alignItems: 'center', lineHeight: 'var(--lumo-line-height-m)' }}>
      <Avatar img={person.pictureUrl} name={`${person.firstName} ${person.lastName}`} />
      <VerticalLayout>
        <span>
          {person.firstName} {person.lastName}
        </span>
        <span
          style={{ color: 'var(--lumo-secondary-text-color)', fontSize: 'var(--lumo-font-size-s)' }}
        >
          {Math.floor(Math.random() * 20) + 1} applications
        </span>
      </VerticalLayout>
    </HorizontalLayout>
  );
}

function createItem(iconName: string, text: string) {
  return (
    <>
      <Icon
        icon={iconName}
        style={{
          color: 'var(--lumo-secondary-text-color)',
          marginInlineEnd: 'var(--lumo-space-s)',
          padding: 'var(--lumo-space-xs)',
        }}
      />
      {text}
    </>
  );
}

/**
 * Workaround: Renders a React given component into a HTMLElement.
 */
function menuComponent(component: React.ReactNode) {
  const container = document.createElement('vaadin-context-menu-item');
  createRoot(container).render(component);
  return container;
}

function Example() {
  const [gridItems, setGridItems] = useState<Person[]>([]);
  const [items, setItems] = useState<ContextMenuItem[]>([]);
  const gridRef = useRef<GridElement>(null);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => {
      setGridItems(people);
      // tag::snippet[]
      const contextMenuItems: ContextMenuItem[] = [
        { component: menuComponent(createItem('vaadin:file-search', 'Open')) },
        {
          component: menuComponent(createItem('vaadin:user-check', 'Assign')),
          children: [
            { component: menuComponent(<Item person={people[0]} />) },
            { component: menuComponent(<Item person={people[1]} />) },
            { component: menuComponent(<Item person={people[2]} />) },
            { component: menuComponent(<Item person={people[3]} />) },
            { component: menuComponent(<Item person={people[4]} />) },
          ],
        },
        { component: 'hr' },
        { component: menuComponent(createItem('vaadin:trash', 'Delete')) },
      ];

      setItems(contextMenuItems);
      // end::snippet[]
    });

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
  }, []);

  // tag::snippet[]
  return (
    <ContextMenu items={items}>
      <Grid allRowsVisible items={gridItems} ref={gridRef}>
        <GridColumn header="Applicant">
          {({ item }) => (
            <span>
              {item.firstName} {item.lastName}
            </span>
          )}
        </GridColumn>
        <GridColumn path="email" />
        <GridColumn header="Phone number" path="address.phone" />
      </Grid>
    </ContextMenu>
  );
  // end::snippet[]
}

export default reactExample(Example);
