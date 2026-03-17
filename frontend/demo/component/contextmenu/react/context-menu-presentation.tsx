import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { ContextMenu, type ContextMenuItem } from '@vaadin/react-components/ContextMenu.js';
import { Grid, type GridElement } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Item({ person }: { person: Person }) {
  useSignals(); // hidden-source-line
  return (
    <div className="person-item">
      <Avatar img={person.pictureUrl} name={`${person.firstName} ${person.lastName}`} />
      <span>
        {person.firstName} {person.lastName}
      </span>
      <span>{person.profession}</span>
    </div>
  );
}

function createItem(iconName: string, text: string) {
  return (
    <>
      <Icon
        icon={iconName}
        style={{
          color: 'var(--vaadin-text-color-secondary)',
          marginInlineEnd: 'var(--vaadin-gap-s)',
          '--vaadin-icon-visual-size': '80%',
        }}
      />
      {text}
    </>
  );
}

function renderApplicant({ item }: { item: Person }) {
  return (
    <span>
      {item.firstName} {item.lastName}
    </span>
  );
}

function Example() {
  useSignals(); // hidden-source-line
  const gridItems = useSignal<Person[]>([]);
  const items = useSignal<ContextMenuItem[]>([]);
  const gridRef = useRef<GridElement>(null);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => {
      gridItems.value = people;
      // tag::snippet[]
      const contextMenuItems: ContextMenuItem[] = [
        { component: createItem('vaadin:file-search', 'Open') },
        {
          component: createItem('vaadin:user-check', 'Assign'),
          children: [
            {
              component: <Item person={people[0]} />,
            },
            {
              component: <Item person={people[1]} />,
            },
            {
              component: <Item person={people[2]} />,
            },
            {
              component: <Item person={people[3]} />,
            },
            {
              component: <Item person={people[4]} />,
            },
          ],
        },
        { component: 'hr' },
        { component: createItem('vaadin:trash', 'Delete') },
      ];

      items.value = contextMenuItems;
      // end::snippet[]
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
  return (
    <ContextMenu items={items.value}>
      <Grid allRowsVisible items={gridItems.value} ref={gridRef}>
        <GridColumn header="Applicant" renderer={renderApplicant} />
        <GridColumn path="email" />
        <GridColumn header="Phone number" path="address.phone" />
      </Grid>
    </ContextMenu>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
