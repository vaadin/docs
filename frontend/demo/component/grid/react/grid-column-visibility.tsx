import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  // tag::snippet[]
  const [items, setItems] = useState<Person[]>([]);

  const [contextMenuItems, setContextMenuItems] = useState([
    { text: 'First name', checked: true, key: 'firstName' },
    { text: 'Last name', checked: true, key: 'lastName' },
    { text: 'Email', checked: true, key: 'email' },
    { text: 'Phone', checked: true, key: 'address.phone' },
    { text: 'Profession', checked: true, key: 'profession' },
  ]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      <HorizontalLayout style={{ alignItems: 'baseline' }}>
        <strong style={{ flex: 1 }}>Employees</strong>
        <ContextMenu
          openOn="click"
          items={contextMenuItems}
          onItemSelected={(e: CustomEvent) => {
            const value = e.detail.value;
            setContextMenuItems(
              contextMenuItems.map((item) =>
                item.key === value.key ? { ...item, checked: !value.checked } : item
              )
            );
          }}
        >
          <Button theme="tertiary">Show/Hide Columns</Button>
        </ContextMenu>
      </HorizontalLayout>

      <Grid items={items}>
        {contextMenuItems.map((item) => (
          <GridColumn path={item.key} hidden={!item.checked} key={item.key} />
        ))}
      </Grid>
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
