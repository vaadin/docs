import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';

interface FileItem {
  name: string;
  size: string;
}

function Example() {
  const items = [
    { text: 'Preview' },
    { text: 'Edit' },
    { component: 'hr' },
    {
      text: 'Export',
      children: [
        { text: 'Portable Document Format (.pdf)', disabled: true },
        { text: 'Rich Text Format (.rtf)' },
        { text: 'Plain text (.txt)' },
      ],
    },
    { text: 'Share', children: [{ text: 'Copy link' }, { text: 'Email' }] },
    { component: 'hr' },
    { text: 'Delete', disabled: true },
  ];

  const gridItems: FileItem[] = [
    { name: 'Annual Report.pdf', size: '24 MB' },
    { name: 'Financials.pdf', size: '42 MB' },
  ];

  return (
    <>
      {/* tag::snippet[] */}
      <ContextMenu items={items}>
        <Grid allRowsVisible items={gridItems}>
          <GridColumn path="name" />
          <GridColumn path="size" />
        </Grid>
      </ContextMenu>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
