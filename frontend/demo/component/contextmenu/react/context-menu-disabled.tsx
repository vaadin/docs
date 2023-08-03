import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';
import { Grid, type GridElement } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';

interface FileItem {
  name: string;
  size: string;
}

function Example() {
  const gridRef = useRef<GridElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      // Workaround: Prevent opening context menu on header row.
      // @ts-expect-error vaadin-contextmenu isn't a GridElement event.
      grid.addEventListener('vaadin-contextmenu', (e) => {
        if (grid.getEventContext(e).section !== 'body') {
          e.stopPropagation();
        }
      });
    }
  }, []);

  // tag::snippet[]
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
    <ContextMenu items={items}>
      <Grid allRowsVisible items={gridItems} ref={gridRef}>
        <GridColumn path="name" />
        <GridColumn path="size" />
      </Grid>
    </ContextMenu>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
