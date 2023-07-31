import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

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
        <Grid allRowsVisible items={gridItems} onContextMenu={onContextMenu}>
          <Grid.Column path="firstName" />
          <Grid.Column path="lastName" />
          <Grid.Column path="email" />
          <Grid.Column header="Phone number" path="address.phone" />
        </Grid>
      </ContextMenu>
      {/* end::snippet[] */}
    </>
  );

  function onContextMenu(e: MouseEvent) {
    const target = e.currentTarget as Grid<Person>;
    if (target.getEventContext(e).section !== 'body') {
      e.stopPropagation();
    }
  }
}

export default reactExample(Example);
