import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      setItems(people);
    });
  }, []);

  return (
    <Grid items={items} theme="column-borders">
      <GridColumn header="Image" flexGrow={0} autoWidth>
        {({ item }) => (
          <Avatar
            img={item.pictureUrl}
            name={`${item.firstName} ${item.lastName}`}
            {...{ alt: 'User avatar' }}
          />
        )}
      </GridColumn>
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
    </Grid>
  );
}

export default reactExample(Example); // hidden-source-line
