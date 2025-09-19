import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { Dialog } from '@vaadin/react-components/Dialog.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const dialogOpened = useSignal(false);
  const people = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 50 }).then((result) => {
      people.value = result.people;
    });
  }, []);

  function open() {
    dialogOpened.value = true;
  }

  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        headerTitle="Employee list"
        resizable
        draggable
        opened={dialogOpened.value}
        onClosed={() => {
          dialogOpened.value = false;
        }}
      >
        <VerticalLayout
          theme="spacing"
          style={{ maxWidth: '100%', minWidth: '300px', height: '100%', alignItems: 'stretch' }}
        >
          <Grid items={people.value}>
            <GridColumn path="firstName" title="First name" />
            <GridColumn path="lastName" title="Last name" />
            <GridColumn path="email" title="Email" />
            <GridColumn path="profession" title="Profession" />
            <GridColumn path="membership" title="Membership" />
          </Grid>
        </VerticalLayout>
      </Dialog>
      {/* end::snippet[] */}

      <Button onClick={open}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
