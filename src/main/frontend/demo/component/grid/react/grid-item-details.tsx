import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
function detailsRenderer({ item: person }: { item: Person }) {
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
}

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const detailsOpenedItem = useSignal<Person[]>([]);

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
      detailsOpenedItems={detailsOpenedItem.value}
      onActiveItemChanged={(event) => {
        const person = event.detail.value;
        detailsOpenedItem.value = person ? [person] : [];
      }}
      rowDetailsRenderer={detailsRenderer}
    >
      <GridColumn path="displayName" header="Name" />
      <GridColumn path="profession" />
    </Grid>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
