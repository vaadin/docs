import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { Dialog } from '@vaadin/react-components/Dialog.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridSelectionColumn } from '@vaadin/react-components/GridSelectionColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example(): React.JSX.Element {
  useSignals(); // hidden-source-line
  const dialogOpened = useSignal(false);
  const people = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 50 }).then((result) => {
      people.value = result.people;
    });
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        theme="no-padding"
        header-title="Filter reports by users:"
        opened={dialogOpened.value}
        onClosed={() => {
          dialogOpened.value = false;
        }}
        footer={
          <Button
            theme="primary"
            onClick={() => {
              dialogOpened.value = false;
            }}
          >
            Filter
          </Button>
        }
      >
        <Grid items={people.value} style={{ width: '500px', maxWidth: '100%' }}>
          <GridSelectionColumn />
          <GridColumn header="Name">
            {({ item }) => (
              <>
                {item.firstName} {item.lastName}
              </>
            )}
          </GridColumn>
        </Grid>
      </Dialog>

      {/* end::snippet[] */}
      <Button
        onClick={() => {
          dialogOpened.value = true;
        }}
      >
        Show dialog
      </Button>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
