import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { Avatar } from '@hilla/react-components/Avatar.js';

function Example() {
  // tag::snippet[]
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <Grid items={items} theme="wrap-cell-content">
      <GridColumn header="Image" flexGrow={0} autoWidth>
        {({ item: person }) => (
          <Avatar img={person.pictureUrl} name={`${person.firstName} ${person.lastName}`} />
        )}
      </GridColumn>
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn header="Address">
        {({ item: { address } }) => (
          <span>
            {address.street} {address.city} {address.zip} {address.state}
          </span>
        )}
      </GridColumn>
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
