import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridFilterColumn } from '@vaadin/react-components/GridFilterColumn.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

type PersonEnhanced = Person & { displayName: string };

const nameRenderer = ({ item: person }: { item: PersonEnhanced }) => (
  <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing">
    <Avatar img={person.pictureUrl} name={person.displayName} />
    <span> {person.displayName} </span>
  </HorizontalLayout>
);

// tag::snippet[]
function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<PersonEnhanced[]>([]);

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
      <GridFilterColumn
        header="Name"
        path="displayName"
        flexGrow={0}
        width="230px"
        renderer={nameRenderer}
      />

      <GridFilterColumn path="email" />
      <GridFilterColumn path="profession" />
    </Grid>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
