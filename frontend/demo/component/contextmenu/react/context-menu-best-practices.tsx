import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';
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

  return (
    <>
      {/* tag::snippet[] */}
      <ContextMenu items={items}>
        <Grid allRowsVisible items={gridItems}>
          <GridColumn path="name" />
          <GridColumn path="size" />
          <GridColumn width="70px" flexGrow={0}>
            {() => <MenuBar items={items} theme="tertiary" />}
          </GridColumn>
        </Grid>
      </ContextMenu>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
