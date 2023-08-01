import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridFilterColumn } from '@hilla/react-components/GridFilterColumn.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
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
  const [items, setItems] = useState<PersonEnhanced[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) =>
      setItems(
        people.map((person) => ({
          ...person,
          displayName: `${person.firstName} ${person.lastName}`,
        }))
      )
    );
  }, []);

  return (
    <>
      <Grid items={items}>
        <GridFilterColumn header="Name" path="displayName" flexGrow={0} width="230px">
          {nameRenderer}
        </GridFilterColumn>

        <GridFilterColumn path="email" />
        <GridFilterColumn path="profession" />
      </Grid>
    </>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
