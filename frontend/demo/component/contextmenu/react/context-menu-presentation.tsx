import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { ContextMenu, MenuItem } from '@hilla/react-components/ContextMenu.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

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

function Example() {
  const [gridItems, setGridItems] = useState<Person[]>([]);
  const [items, setItems] = useState<MenuItem[] | undefined>(undefined);

  useEffect(() => {
    getPeople({ count: 10 }).then(({ people }) => {
      setGridItems(people.slice(0, 5));
      setItems([
        { component: <MenuItem>{createItem('vaadin:file-search', 'Open')}</MenuItem> },
        {
          component: (
            <MenuItem>
              {createItem('vaadin:user-check', 'Assign')}
              <MenuItem>{createItemsArray(people.slice(5, 10))[0]}</MenuItem>
              <MenuItem>{createItemsArray(people.slice(5, 10))[1]}</MenuItem>
              <MenuItem>{createItemsArray(people.slice(5, 10))[2]}</MenuItem>
              <MenuItem>{createItemsArray(people.slice(5, 10))[3]}</MenuItem>
              <MenuItem>{createItemsArray(people.slice(5, 10))[4]}</MenuItem>
            </MenuItem>
          ),
        },
        { component: <MenuItem component="hr" /> },
        { component: <MenuItem>{createItem('vaadin:trash', 'Delete')}</MenuItem> },
      ]);
    });
  }, []);

  function createItemsArray(people: Person[]) {
    return people.map((person, index) => (
      <MenuItem key={index.toString()}>{<Item person={person} />}</MenuItem>
    ));
  }

  function createItem(iconName: string, text: string) {
    return (
      <>
        <span
          style={{
            color: 'var(--lumo-secondary-text-color)',
            marginInlineEnd: 'var(--lumo-space-s)',
            padding: 'var(--lumo-space-xs)',
          }}
        >
          <i className={`fancy-icon vaadin ${iconName}`} />
        </span>
        {text}
      </>
    );
  }

  function onContextMenu(e: React.MouseEvent<HTMLElement>) {
    // Prevent opening context menu on header row.
    const target = e.currentTarget as unknown as Grid<Person>;
    if (target.getEventContext(e.nativeEvent).section !== 'body') {
      e.stopPropagation();
    }
  }

  return (
    <ContextMenu items={items}>
      <Grid items={gridItems} onContextMenu={onContextMenu}>
        <GridColumn
          header="Applicant"
          path={['firstName', , 'lastName']}
          bodyRenderer={({ item }) => (
            <span>
              {item.firstName} {item.lastName}
            </span>
          )}
        />
        <GridColumn path="email" />
        <GridColumn header="Phone number" path={['address', 'phone']} />
      </Grid>
    </ContextMenu>
  );
}

export default reactExample(Example);
