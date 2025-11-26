import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useCallback } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import {
  Grid,
  type GridDataProviderCallback,
  type GridDataProviderParams,
} from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridTreeToggle } from '@vaadin/react-components/GridTreeToggle.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

async function dataProvider(
  params: GridDataProviderParams<Person>,
  callback: GridDataProviderCallback<Person>
) {
  const { people, hierarchyLevelSize } = await getPeople({
    count: params.pageSize,
    startIndex: params.page * params.pageSize,
    managerId: params.parentItem ? params.parentItem.id : null,
  });

  callback(people, hierarchyLevelSize);
}

function contactRenderer({ item: person }: { item: Person }) {
  return (
    <VerticalLayout
      style={{
        fontSize: 'var(--lumo-font-size-s)',
        lineHeight: 'var(--lumo-line-height-m)',
      }}
    >
      <a href={`mailto:${person.email}`} style={{ display: 'flex', alignItems: 'center' }}>
        <Icon
          icon="vaadin:envelope"
          style={{
            height: 'var(--lumo-icon-size-s)',
            marginInlineEnd: '0.5rem',
            width: 'var(--lumo-icon-size-s)',
          }}
        />
        <span>{person.email}</span>
      </a>
      <a href={`tel:${person.address.phone}`} style={{ display: 'flex', alignItems: 'center' }}>
        <Icon
          icon="vaadin:phone"
          style={{
            height: 'var(--lumo-icon-size-s)',
            marginInlineEnd: '0.5rem',
            width: 'var(--lumo-icon-size-s)',
          }}
        />
        <span>{person.address.phone}</span>
      </a>
    </VerticalLayout>
  );
}

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const expandedItems = useSignal<Person[]>([]);

  const toggleRenderer = useCallback(
    ({ item: person, model }: { item: Person; model: { level?: number; expanded?: boolean } }) => (
      <GridTreeToggle
        leaf={!person.manager}
        level={model?.level ?? 0}
        expanded={!!model?.expanded}
        onClick={(e) => {
          if (!e.defaultPrevented) {
            return;
          }
          if (e.currentTarget.expanded) {
            expandedItems.value = [...expandedItems.value, person];
          } else {
            expandedItems.value = expandedItems.value.filter((p) => p.id !== person.id);
          }
        }}
      >
        <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing">
          <Avatar img={person.pictureUrl} name={`${person.firstName} ${person.lastName}`} />
          <VerticalLayout style={{ lineHeight: 'var(--lumo-line-height-m)' }}>
            <span>
              {person.firstName} {person.lastName}
            </span>
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
    ),
    []
  );

  return (
    <Grid dataProvider={dataProvider} expandedItems={expandedItems.value}>
      <GridColumn autoWidth header="Employee" renderer={toggleRenderer} />
      <GridColumn autoWidth header="Contact" renderer={contactRenderer} />
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
