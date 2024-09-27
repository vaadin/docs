import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { ContextMenu } from '@vaadin/react-components/ContextMenu.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const items = useSignal<Person[]>([]);
  const contextMenuItems = useSignal([
    { text: 'First name', checked: true, key: 'firstName', keepOpen: true },
    { text: 'Last name', checked: true, key: 'lastName', keepOpen: true },
    { text: 'Email', checked: true, key: 'email', keepOpen: true },
    { text: 'Phone', checked: true, key: 'address.phone', keepOpen: true },
    { text: 'Profession', checked: true, key: 'profession', keepOpen: true },
  ]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    <>
      <HorizontalLayout style={{ alignItems: 'baseline' }}>
        <strong style={{ flex: 1 }}>Employees</strong>
        <ContextMenu
          openOn="click"
          items={contextMenuItems.value}
          onItemSelected={(e: CustomEvent) => {
            const item = e.detail.value;
            item.checked = !item.checked;
            contextMenuItems.value = [...contextMenuItems.value];
          }}
        >
          <Button theme="tertiary">Show/Hide Columns</Button>
        </ContextMenu>
      </HorizontalLayout>

      <Grid items={items.value}>
        {contextMenuItems.value.map((item) => (
          <GridColumn path={item.key} hidden={!item.checked} key={item.key} />
        ))}
      </Grid>
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
