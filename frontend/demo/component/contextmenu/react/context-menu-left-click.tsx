import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';
import { Grid } from '@hilla/react-components/Grid.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items] = useState([{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }]);
  const [gridItems, setGridItems] = useState<Person[]>([]);
  const [contextMenuOpened, setContextMenuOpened] = useState(false);

  const onClick = (e: MouseEvent) => {
    // Prevent opening context menu on header row click.
    const target = e.currentTarget as Grid<Person>;
    if (!contextMenuOpened && target.getEventContext(e).section !== 'body') {
      e.stopPropagation();
    }
  };

  React.useEffect(() => {
    getPeople({ count: 5 }).then(({ people }) => setGridItems(people));
  }, []);

  return (
    <>
      {/* tag::snippethtml[] */}
      <ContextMenu
        openOn="click"
        items={items}
        onOpenedChanged={({ detail }) => setContextMenuOpened(detail.value)}
      >
        <Grid allRowsVisible items={gridItems} onClick={onClick}>
          <GridColumn path="firstName"></GridColumn>
          <GridColumn path="lastName"></GridColumn>
          <GridColumn path="email"></GridColumn>
          <GridColumn header="Phone number" path="address.phone"></GridColumn>
        </Grid>
      </ContextMenu>
      {/* end::snippethtml[] */}
    </>
  );
}

export default reactExample(Example);
