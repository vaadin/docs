import { reactExample } from 'Frontend/demo/react/react-example'; // hidden-source-line
export default reactExample(Example); // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  // tag::snippet[]
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <Grid items={items}>
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
      <GridColumn path="profession" />
    </Grid>
  );
  // end::snippet[]
}
