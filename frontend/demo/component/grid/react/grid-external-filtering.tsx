import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { Icon } from '@vaadin/react-components/Icon.js';
import '@vaadin/icons';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

type PersonEnhanced = Person & { displayName: string };

// tag::snippet[]
function nameRenderer(person: PersonEnhanced) {
  return (
    <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing">
      <Avatar img={person.pictureUrl} name={person.displayName}></Avatar>
      <span> {person.displayName} </span>
    </HorizontalLayout>
  );
}

function Example() {
  useSignals(); // hidden-source-line
  const filteredItems = useSignal<PersonEnhanced[]>([]);
  const items = useSignal<PersonEnhanced[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      const newItems = people.map((person) => ({
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      }));
      items.value = newItems;
      filteredItems.value = newItems;
    });
  }, []);

  return (
    <>
      <VerticalLayout theme="spacing">
        <TextField
          placeholder="Search"
          style={{ width: '50%' }}
          onValueChanged={(e) => {
            const searchTerm = (e.detail.value || '').trim().toLowerCase();
            filteredItems.value = items.value.filter(
              ({ displayName, email, profession }) =>
                !searchTerm ||
                displayName.toLowerCase().includes(searchTerm) ||
                email.toLowerCase().includes(searchTerm) ||
                profession.toLowerCase().includes(searchTerm)
            );
          }}
        >
          <Icon slot="prefix" icon="vaadin:search"></Icon>
        </TextField>

        <Grid items={filteredItems.value}>
          <GridColumn header="Name" flexGrow={0} width="230px">
            {({ item }) => nameRenderer(item)}
          </GridColumn>

          <GridColumn path="email"></GridColumn>
          <GridColumn path="profession"></GridColumn>
        </Grid>
      </VerticalLayout>
    </>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
