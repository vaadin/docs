import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';

function Example() {
  return (
    <Grid>
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
      <GridColumn path="profession" />

      {/* tag::snippet[] */}
      <span slot="empty-state">No employees found.</span>
      {/* end::snippet[] */}
    </Grid>
  );
}

export default reactExample(Example); // hidden-source-line
