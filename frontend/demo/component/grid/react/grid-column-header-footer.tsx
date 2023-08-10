import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

// tag::snippet[]
function subscriberHeaderRenderer() {
  return (
    <HorizontalLayout style={{ alignItems: 'center' }}>
      <span>Subscriber</span>
      <Icon
        icon="vaadin:info-circle"
        title="Subscribers are paying customers"
        style={{ height: 'var(--lumo-font-size-m)', color: 'var(--lumo-contrast-70pct)' }}
      />
    </HorizontalLayout>
  );
}

function membershipHeaderRenderer() {
  return (
    <HorizontalLayout style={{ alignItems: 'center' }}>
      <span>Membership</span>
      <Icon
        icon="vaadin:info-circle"
        title="Membership levels determines which features a client has access to"
        style={{ height: 'var(--lumo-font-size-m)', color: 'var(--lumo-contrast-70pct)' }}
      />
    </HorizontalLayout>
  );
}

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) =>
      setItems(
        people.map((person) => ({
          ...person,
          displayName: `${person.firstName} ${person.lastName}`,
        }))
      )
    );
  }, []);

  return (
    <Grid items={items}>
      <GridColumn
        path="displayName"
        header="Name"
        footerRenderer={() => <span>200 total members</span>}
      />

      <GridColumn
        headerRenderer={subscriberHeaderRenderer}
        footerRenderer={() => <span>102 subscribers</span>}
      >
        {({ item }) => <span>{item.subscriber ? 'Yes' : 'No'}</span>}
      </GridColumn>

      <GridColumn
        path="membership"
        headerRenderer={membershipHeaderRenderer}
        footerRenderer={() => <span>103 regular, 71 premium , 66 VIP</span>}
      />
    </Grid>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
