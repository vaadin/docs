import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { ContextMenu, MenuItem } from '@hilla/react-components/ContextMenu.js';
import { Grid } from '@hilla/react-components/Grid.js';

interface FileItem {
  name: string;
  size: string;
}

const Example: React.FC = () => {
  const items = [
    { text: 'Preview' },
    { text: 'Edit' },
    { component: 'hr' },
    {
      text: 'Export',
      children: [
        { text: 'Portable Document Format (.pdf)' },
        { text: 'Rich Text Format (.rtf)' },
        { text: 'Plain text (.txt)' },
      ],
    },
    { text: 'Share', children: [{ text: 'Copy link' }, { text: 'Email' }] },
    { component: 'hr' },
    { text: 'Delete' },
  ];

  const gridItems: FileItem[] = [
    { name: 'Annual Report.docx', size: '24 MB' },
    { name: 'Financials.xlsx', size: '42 MB' },
  ];

  const onContextMenu = (e: React.MouseEvent<HTMLElement>, context: Grid<FileItem>) => {
    // Prevent opening context menu on header row.
    if (context.getEventContext(e).section !== 'body') {
      e.stopPropagation();
    }
  };

  return (
    <>
      {/* tag::snippet[] */}
      <ContextMenu items={items}>
        <Grid
          allRowsVisible
          items={gridItems}
          onContextMenu={(e, context) => onContextMenu(e, context)}
        >
          <GridColumn path="name" />
          <GridColumn path="size" />
        </Grid>
      </ContextMenu>
      {/* end::snippet[] */}
    </>
  );
};

export default reactExample(Example);
