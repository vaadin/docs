import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import {
  Grid,
  type GridDataProviderCallback,
  type GridDataProviderParams,
} from '@hilla/react-components/Grid.js';
import { GridTreeToggle } from '@hilla/react-components/GridTreeToggle.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import '@vaadin/icons';
import { Icon } from '@hilla/react-components/Icon.js';

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
  // tag::snippet[]
  const [expandedItems, setExpandedItems] = useState<Person[]>([]);

  return (
    <Grid dataProvider={dataProvider} expandedItems={expandedItems}>
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
                setExpandedItems([...expandedItems, person]);
              } else {
                setExpandedItems(expandedItems.filter((p) => p.id !== person.id));
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
