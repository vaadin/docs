React: import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <ContextMenu
        items={[
          { text: 'View' },
          <hr />,
          { text: 'Edit' },
          { text: 'Delete' },
          <hr />,
          { text: 'Email' },
          { text: 'Call' },
        ]}
      >
        <Grid
          allRowsVisible
          onContextMenu={({ target }) => {
            if (target.section !== 'body') {
              return false;
            }
          }}
        >
          <GridColumn path="firstName" />
          <GridColumn path="lastName" />
          <GridColumn path="email" />
          <GridColumn header="Phone number" path="address.phone" />
        </Grid>
      </ContextMenu>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
