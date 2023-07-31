import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople({ count: 20 }).then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <AppLayout>
        <h1 slot="navbar">MyApp</h1>

        <Grid items={items} allRowsVisible>
          <GridColumn path="firstName" />
          <GridColumn path="lastName" />
          <GridColumn path="email" />
          <GridColumn path="profession" />
        </Grid>
      </AppLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
