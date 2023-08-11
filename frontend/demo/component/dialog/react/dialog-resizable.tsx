import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 50 }).then((result) => setPeople(result.people));
  }, []);

  function open() {
    setDialogOpened(true);
  }

  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        headerTitle="Employee list"
        resizable
        draggable
        opened={dialogOpened}
        onOpenedChanged={(event) => {
          setDialogOpened(event.detail.value);
        }}
      >
        <VerticalLayout
          theme="spacing"
          style={{ maxWidth: '100%', minWidth: '300px', height: '100%', alignItems: 'stretch' }}
        >
          <Grid items={people}>
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
