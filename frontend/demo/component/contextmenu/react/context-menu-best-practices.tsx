import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { contextMenuRenderer } from '@hilla/react-components/ContextMenu.js';
import { MenuBar } from '@hilla/react-components/MenuBar.js';

interface FileItem {
  name: string;
  size: string;
}

function Example() {
  const [items] = useState([{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }]);
  const [gridItems] = useState<FileItem[]>([
    { name: 'Annual Report.docx', size: '24 MB' },
    { name: 'Financials.xlsx', size: '42 MB' },
  ]);

  const onContextMenu = (e: React.MouseEvent) => {
    const target = e.currentTarget as Grid<FileItem>;
    if (target.getEventContext(e).section !== 'body') {
      e.stopPropagation();
    }
  };

  return (
    <>
      {/* tag::snippet[] */}
      <ContextMenu .items={items}>
        <Grid
          allRowsVisible
          items={gridItems}
          onContextMenu={onContextMenu}
        >
          <GridColumn path="name" />
          <GridColumn path="size" />
          <GridColumn
            width="70px"
            flexGrow={0}
            
          >
            {() => (
              <MenuBar items={items} theme="tertiary" />
            )}
          </GridColumn>
        </Grid>
      </ContextMenu>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);

    

