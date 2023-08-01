import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';
import { Grid, type GridElement } from '@hilla/react-components/Grid.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { GridColumn } from '@hilla/react-components/GridColumn.js';

function Example() {
  const [items] = useState([{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }]);
  const [gridItems, setGridItems] = useState<Person[]>([]);
  const [contextMenuOpened, setContextMenuOpened] = useState(false);

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
        <Grid
          allRowsVisible
          items={gridItems}
          onClick={(e) => {
            // Prevent opening context menu on header row click.
            const target = e.currentTarget as GridElement<Person>;
            if (!contextMenuOpened && target.getEventContext(e.nativeEvent).section !== 'body') {
              e.stopPropagation();
            }
          }}
        >
          <GridColumn path="firstName" />
          <GridColumn path="lastName" />
          <GridColumn path="email" />
          <GridColumn header="Phone number" path="address.phone" />
        </Grid>
      </ContextMenu>
      {/* end::snippethtml[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
