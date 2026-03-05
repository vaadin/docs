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

// tag::snippet[]
function contactRenderer({ item: person }: { item: Person }) {
  return (
    <VerticalLayout
      style={{
        fontSize: '.875rem',
        lineHeight: '1.625',
      }}
    >
      <a href={`mailto:${person.email}`} style={{ display: 'flex', alignItems: 'center' }}>
        <Icon
          icon="vaadin:envelope"
          style={{
            width: '1.25em',
            height: '1.25em',
            marginInlineEnd: 'var(--vaadin-gap-s)',
          }}
        />
        <span>{person.email}</span>
      </a>
      <a href={`tel:${person.address.phone}`} style={{ display: 'flex', alignItems: 'center' }}>
        <Icon
          icon="vaadin:phone"
          style={{
            width: '1.25em',
            height: '1.25em',
            marginInlineEnd: 'var(--vaadin-gap-s)',
          }}
        />
        <span>{person.address.phone}</span>
      </a>
    </VerticalLayout>
  );
}

function Example() {
  useSignals(); // hidden-source-line
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
        <div className="person-item">
          <Avatar
            img={person.pictureUrl}
            name={`${person.firstName} ${person.lastName}`}
            style={{ '--vaadin-avatar-size': '2.25rem' }}
          />
          <span>
            {person.firstName} {person.lastName}
          </span>
          <span>{person.profession}</span>
        </div>
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
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
