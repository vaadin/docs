import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

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
  const [filteredItems, setFilteredItems] = useState<PersonEnhanced[]>([]);
  const [items, setItems] = useState<PersonEnhanced[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      const newItems = people.map((person) => ({
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      }));
      setItems(newItems);
      setFilteredItems(newItems);
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
            setFilteredItems(
              items.filter(
                ({ displayName, email, profession }) =>
                  !searchTerm ||
                  displayName.toLowerCase().includes(searchTerm) ||
                  email.toLowerCase().includes(searchTerm) ||
                  profession.toLowerCase().includes(searchTerm)
              )
            );
          }}
        >
          <Icon slot="prefix" icon="vaadin:search"></Icon>
        </TextField>

        <Grid items={filteredItems}>
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
