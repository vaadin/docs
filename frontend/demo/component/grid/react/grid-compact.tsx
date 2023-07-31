import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <Grid items={items} theme="compact">
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
      </Grid>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
