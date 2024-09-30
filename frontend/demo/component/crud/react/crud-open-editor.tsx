import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid, type GridElement } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { Crud } from '@vaadin/react-components-pro/Crud.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const editedItem = useSignal<Person | undefined>(undefined);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  function onEditedItemChanged(event: any) {
    editedItem.value = event.detail.value;
  }

  function onDblClick(e: React.MouseEvent) {
    const target = e.currentTarget as GridElement<Person>;
    editedItem.value = target.getEventContext(e.nativeEvent).item;
  }

  return (
    // tag::snippet[]
    <Crud
      include="firstName, lastName, email, profession"
      items={items.value}
      editedItem={editedItem.value}
      onEditedItemChanged={onEditedItemChanged}
    >
      <Grid slot="grid" onDoubleClick={onDblClick}>
        <GridColumn path="firstName" header="First name" />
        <GridColumn path="lastName" header="Last name" />
        <GridColumn path="email" header="Email" />
        <GridColumn path="profession" header="Profession" />
      </Grid>
    </Crud>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
