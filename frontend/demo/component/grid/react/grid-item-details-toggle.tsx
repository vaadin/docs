import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useCallback, useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const items = useSignal<Person[]>([]);
  const detailsOpenedItems = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people.map((person) => ({
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      }));
    });
  }, []);

  const detailsRenderer = useCallback(({ item: person }: { item: Person }) => {
    return (
      <FormLayout responsiveSteps={[{ minWidth: '0', columns: 3 }]}>
        <TextField label="Email address" value={person.email} data-colspan="3" readonly />
        <TextField label="Phone number" value={person.address.phone} data-colspan="3" readonly />
        <TextField label="Street address" value={person.address.street} data-colspan="3" readonly />
        <TextField label="ZIP code" value={person.address.zip} readonly />
        <TextField label="City" value={person.address.city} readonly />
        <TextField label="State" value={person.address.state} readonly />
      </FormLayout>
    );
  }, []);

  const toggleDetailsRenderer = useCallback(({ item: person }: { item: Person }) => {
    const isExpanded = detailsOpenedItems.value.includes(person);
    return (
      <Button
        theme="tertiary icon"
        aria-label="Toggle details"
        aria-expanded={isExpanded}
        onClick={() => {
          detailsOpenedItems.value = isExpanded
            ? detailsOpenedItems.value.filter((p) => p !== person)
            : [...detailsOpenedItems.value, person];
        }}
      >
        <Icon icon={isExpanded ? 'lumo:angle-down' : 'lumo:angle-right'} />
      </Button>
    );
  }, []);

  return (
    <Grid
      theme="row-stripes"
      items={items.value}
      detailsOpenedItems={detailsOpenedItems.value}
      rowDetailsRenderer={detailsRenderer}
    >
      <GridColumn width="80px" flexGrow={0} frozen renderer={toggleDetailsRenderer} />
      <GridColumn path="displayName" header="Name" />
      <GridColumn path="profession" />
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
