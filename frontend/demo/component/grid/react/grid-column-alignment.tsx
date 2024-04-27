import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { format } from 'date-fns';

function randomDate() {
  const futureDate = new Date(Date.now() + Math.floor(Math.random() * 10000000000));
  return format(futureDate, 'P');
}

function randomAmount() {
  return Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' }).format(
    Math.floor(Math.random() * 1000000)
  );
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
    // tag::snippet[]
    <Grid items={items.value}>
      <GridColumn path="displayName" header="Name" />
      <GridColumn header="Due">{() => <span>{randomDate()}</span>}</GridColumn>
      <GridColumn header="Amount" textAlign="end">
        {() => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{randomAmount()}</span>}
      </GridColumn>
    </Grid>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
