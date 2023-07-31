import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Crud } from '@hilla/react-components/Crud.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { CrudEditColumn } from '@hilla/react-components/CrudEditColumn.js';

function Example() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <Crud include="firstName, lastName, email, profession" items={items}>
        <Grid slot="grid">
          <CrudEditColumn />
          <GridColumn path="firstName" header="First name" />
          <GridColumn path="lastName" header="Last name" />
          <GridColumn path="email" header="Email" />
          <GridColumn path="profession" header="Profession" />
        </Grid>
      </Crud>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
