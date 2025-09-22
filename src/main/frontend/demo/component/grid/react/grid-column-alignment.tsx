import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { format } from 'date-fns';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

interface Loan {
  displayName: string;
  due: string;
  amount: string;
}

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
  const items = useSignal<Loan[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people.map((person) => ({
        displayName: `${person.firstName} ${person.lastName}`,
        due: randomDate(),
        amount: randomAmount(),
      }));
    });
  }, []);

  return (
    // tag::snippet[]
    <Grid items={items.value}>
      <GridColumn path="displayName" header="Name" />
      <GridColumn path="due" header="Due" />
      <GridColumn path="amount" header="Amount" textAlign="end" />
    </Grid>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
