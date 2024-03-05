import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Crud, CrudEditColumn, Grid, GridColumn } from '@vaadin/react-components';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    // tag::snippet[]
    <Crud include="firstName, lastName, email, profession" items={items}>
      <Grid slot="grid">
        <CrudEditColumn />
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
