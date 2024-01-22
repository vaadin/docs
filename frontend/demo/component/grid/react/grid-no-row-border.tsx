import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@vaadin/react-components/Grid.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { Avatar } from '@vaadin/react-components/Avatar.js';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    // tag::snippet[]
    <Grid items={items} theme="no-row-borders">
      <GridColumn header="Image" flexGrow={0} autoWidth>
        {({ item }) => (
          <Avatar
            img={item.pictureUrl}
            name={`${item.firstName} ${item.lastName}`}
          />
        )}
      </GridColumn>
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
    </Grid>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
