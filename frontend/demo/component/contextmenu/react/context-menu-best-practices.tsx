import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { ContextMenu } from '@vaadin/react-components/ContextMenu.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { MenuBar } from '@vaadin/react-components/MenuBar.js';

interface FileItem {
  name: string;
  size: string;
}

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal([{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }]);
  const gridItems = useSignal<FileItem[]>([
    { name: 'Annual Report.docx', size: '24 MB' },
    { name: 'Financials.xlsx', size: '42 MB' },
  ]);

  return (
    // tag::snippet[]
    <ContextMenu items={items.value}>
      <Grid allRowsVisible items={gridItems.value}>
        <GridColumn path="name" />
        <GridColumn path="size" />
        <GridColumn width="70px" flexGrow={0}>
          {() => <MenuBar items={items.value} theme="tertiary" />}
        </GridColumn>
      </Grid>
    </ContextMenu>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
