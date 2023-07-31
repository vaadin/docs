import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { ListBox } from '@hilla/react-components/ListBox.js';
import { Item } from '@hilla/react-components/Item.js';
import { Link } from '@hilla/react-components/Link.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function EmployeeRenderer({ item: person, model }: { item: Person; model: any }) {
  const [expandedItems, setExpandedItems] = useState<Person[]>([]);

  return (
    <>
      <GridTreeToggle
        leaf={!person.manager}
        level={model.level ?? 0}
        expanded={!!model.expanded}
        onExpandedChanged={(event) => {
          if (event.detail.value) {
            setExpandedItems([...expandedItems, person]);
          } else {
            setExpandedItems(expandedItems.filter((p) => p.id !== person.id));
          }
        }}
      >
        <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing">
          <Avatar img={person.pictureUrl} name={`${person.firstName} ${person.lastName}`} />
          <VerticalLayout style={{ lineHeight: 'var(--lumo-line-height-m)' }}>
            <span>{`${person.firstName} ${person.lastName}`}</span>
            <span
              style={{
                fontSize: 'var(--lumo-font-size-s)',
                color: 'var(--lumo-secondary-text-color)',
              }}
            >
              {person.profession}
            </span>
          </VerticalLayout>
        </HorizontalLayout>
      </GridTreeToggle>

      {expandedItems.includes(person) && (
        <Grid items={person.children}>
          <GridColumn autoWidth header="Employee" renderer={EmployeeRenderer} />
          <GridColumn autoWidth header="Contact" renderer={ContactRenderer} />
        </Grid>
      )}
    </>
  );
}

function ContactRenderer({ item: person }: { item: Person }) {
  return (
    <VerticalLayout
      style={{
        fontSize: 'var(--lumo-font-size-s)',
        lineHeight: 'var(--lumo-line-height-m)',
      }}
    >
      <Link href={`mailto:${person.email}`} style={{ alignItems: 'center', display: 'flex' }}>
        <Icon
          icon="vaadin:envelope"
          style={{
            height: 'var(--lumo-icon-size-s)',
            marginInlineEnd: 'var(--lumo-space-s)',
            width: 'var(--lumo-icon-size-s)',
          }}
        />
        <span>{person.email}</span>
      </Link>
      <Link href={`tel:${person.address.phone}`} style={{ alignItems: 'center', display: 'flex' }}>
        <Icon
          icon="vaadin:phone"
          style={{
            height: 'var(--lumo-icon-size-s)',
            marginInlineEnd: 'var(--lumo-space-s)',
            width: 'var(--lumo-icon-size-s)',
          }}
        />
        <span>{person.address.phone}</span>
      </Link>
    </VerticalLayout>
  );
}

function Example() {
  const [expandedItems, setExpandedItems] = useState<Person[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  const dataProvider = async (params: any, callback: any) => {
    const { people: newPeople } = await getPeople({
      count: params.pageSize,
      startIndex: params.page * params.pageSize,
      managerId: params.parentItem ? params.parentItem.id : null,
    });
    callback(newPeople);
  };

  return (
    <>
      <Grid
        dataProvider={dataProvider}
        expandedItems={expandedItems}
        onExpandedItemsChanged={setExpandedItems}
      >
        <GridColumn autoWidth header="Employee" renderer={EmployeeRenderer} />
        <GridColumn autoWidth header="Contact" renderer={ContactRenderer} />
      </Grid>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
