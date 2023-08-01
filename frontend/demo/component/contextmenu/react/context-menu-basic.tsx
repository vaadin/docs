import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { GridColumn } from '@hilla/react-components/GridColumn.js';

function Example() {
  const [items] = useState([{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }]);
  const [gridItems, setGridItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => setGridItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <ContextMenu items={items}>
        <Grid allRowsVisible items={gridItems}>
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
