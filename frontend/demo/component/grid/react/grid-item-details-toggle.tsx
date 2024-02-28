import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { Button } from '@vaadin/react-components/Button.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

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

  return (
    <Grid
      theme="row-stripes"
      items={items.value}
      detailsOpenedItems={detailsOpenedItems.value}
      rowDetailsRenderer={({ item: person }) => (
        <FormLayout responsiveSteps={[{ minWidth: '0', columns: 3 }]}>
          <TextField label="Email address" value={person.email} {...{ colspan: 3 }} readonly />
          <TextField
            label="Phone number"
            value={person.address.phone}
            {...{ colspan: 3 }}
            readonly
          />
          <TextField
            label="Street address"
            value={person.address.street}
            {...{ colspan: 3 }}
            readonly
          />
          <TextField label="ZIP code" value={person.address.zip} readonly />
          <TextField label="City" value={person.address.city} readonly />
          <TextField label="State" value={person.address.state} readonly />
        </FormLayout>
      )}
    >
      <GridColumn path="displayName" header="Name" />
      <GridColumn path="profession" />
      <GridColumn>
        {({ item: person }) => (
          <Button
            theme="tertiary"
            onClick={() => {
              const isOpened = detailsOpenedItems.value.includes(person);
              detailsOpenedItems.value = isOpened
                ? detailsOpenedItems.value.filter((p) => p !== person)
                : [...detailsOpenedItems.value, person];
            }}
          >
            Toggle details
          </Button>
        )}
      </GridColumn>
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
