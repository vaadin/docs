import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridFilterColumn } from '@hilla/react-components/GridFilterColumn.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

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
        <GridFilterColumn
          header="Name"
          path="displayName"
          flexGrow={0}
          width="230px"
          bodyRenderer={nameRenderer}
        />

        <GridFilterColumn path="email" />
        <GridFilterColumn path="profession" />
      </Grid>
    </>
  );
}

const nameRenderer = (person: PersonEnhanced) => (
  <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing">
    <Avatar img={person.pictureUrl} name={person.displayName} />
    <span> {person.displayName} </span>
  </HorizontalLayout>
);
// end::snippet[]

export default reactExample(Example);
