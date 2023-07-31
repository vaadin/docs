import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  async function fetchData() {
    const { people } = await getPeople({ count: 50 });
    setPeople(people);
  }

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
          {() => (
            <Grid items={people}>
              <GridColumn path="firstName" title="First name" />
              <GridColumn path="lastName" title="Last name" />
              <GridColumn path="email" title="Email" />
              <GridColumn path="profession" title="Profession" />
              <GridColumn path="membership" title="Membership" />
            </Grid>
          )}
        </VerticalLayout>
      </Dialog>
      {/* end::snippet[] */}

      <Button onClick={open}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example);
