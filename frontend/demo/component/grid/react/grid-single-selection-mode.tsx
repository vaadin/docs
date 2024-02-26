import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const selectedItems = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    <Grid
      items={items.value}
      selectedItems={selectedItems.value}
      onActiveItemChanged={(e) => {
        const item = e.detail.value;
        selectedItems.value = item ? [item] : [];
      }}
    >
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
    </Grid>
  );
}

export default reactExample(Example); // hidden-source-line
