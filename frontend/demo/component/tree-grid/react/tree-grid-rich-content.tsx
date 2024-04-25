import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import {
  Grid,
  type GridDataProviderCallback,
  type GridDataProviderParams,
} from '@vaadin/react-components/Grid.js';
import { GridTreeToggle } from '@vaadin/react-components/GridTreeToggle.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import '@vaadin/icons';
import { Icon } from '@vaadin/react-components/Icon.js';

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

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const expandedItems = useSignal<Person[]>([]);

  return (
    <Grid dataProvider={dataProvider} expandedItems={expandedItems.value}>
      <GridColumn autoWidth header="Employee">
        {({ item: person, model }) => (
          <GridTreeToggle
            leaf={!person.manager}
            level={model?.level ?? 0}
            expanded={!!model?.expanded}
            onClick={(e) => {
              // The click listener needs to check if the event gets canceled (by
              // vaadin-grid-tree-toggle) and only continue if it does.
              // vaadin-grid-tree-toggle will cancel the event if the user clicks on
              // a non-focusable element inside the toggle.
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
        )}
      </GridColumn>

      <GridColumn autoWidth header="Contact">
        {({ item: person }) => (
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
                  marginInlineEnd: 'var(--lumo-space-s)',
                  width: 'var(--lumo-icon-size-s)',
                }}
              />
              <span>{person.email}</span>
            </a>
            <a
              href={`tel:${person.address.phone}`}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Icon
                icon="vaadin:phone"
                style={{
                  height: 'var(--lumo-icon-size-s)',
                  marginInlineEnd: 'var(--lumo-space-s)',
                  width: 'var(--lumo-icon-size-s)',
                }}
              />
              <span>{person.address.phone}</span>
            </a>
          </VerticalLayout>
        )}
      </GridColumn>
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
