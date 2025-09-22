import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
function SubscriberHeader() {
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

function MembershipHeader() {
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

function subscriberRenderer({ item }: { item: Person }) {
  return <span>{item.subscriber ? 'Yes' : 'No'}</span>;
}

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people.map((person) => ({
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      }));
    });
  }, []);

  return (
    <Grid items={items.value}>
      <GridColumn path="displayName" header="Name" footer={<span>200 total members</span>} />

      <GridColumn
        header={<SubscriberHeader />}
        footer={<span>102 subscribers</span>}
        renderer={subscriberRenderer}
      />

      <GridColumn
        path="membership"
        header={<MembershipHeader />}
        footer={<span>103 regular, 71 premium , 66 VIP</span>}
      />
    </Grid>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
