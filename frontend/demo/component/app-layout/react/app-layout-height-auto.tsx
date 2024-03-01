import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { AppLayout, Grid, GridColumn } from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

const h1Style = {
  fontSize: 'var(--lumo-font-size-l)',
  margin: 'var(--lumo-space-m)',
};

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 20 }).then(({ people }) => setItems(people));
  }, []);

  return (
    // tag::snippet[]
    <AppLayout>
      <h1 slot="navbar" style={h1Style}>
        MyApp
      </h1>

      <Grid items={items} allRowsVisible>
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
        <GridColumn path="profession" />
      </Grid>
    </AppLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
