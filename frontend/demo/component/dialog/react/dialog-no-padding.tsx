import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridSelectionColumn } from '@hilla/react-components/GridSelectionColumn.js';

import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example(): JSX.Element {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 50 }).then((result) => setPeople(result.people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        theme="no-padding"
        header-title="Filter reports by users:"
        opened={dialogOpened}
        onOpenedChanged={({ detail }) => setDialogOpened(detail.value)}
        footerRenderer={() => (
          <Button theme="primary" onClick={() => setDialogOpened(false)}>
            Filter
          </Button>
        )}
      >
        <Grid items={people} style={{ width: '500px', maxWidth: '100%' }}>
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
      <Button onClick={() => setDialogOpened(true)}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
