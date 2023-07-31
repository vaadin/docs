import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridSelectionColumn } from '@hilla/react-components/GridSelectionColumn.js';

import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example(): JSX.Element {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  React.useEffect(() => {
    getPeople({ count: 50 }).then(({ people }) => setPeople(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <Dialog
        theme="no-padding"
        header-title="Filter reports by users:"
        opened={dialogOpened}
        onOpenedChanged={({ detail }) => setDialogOpened(detail.opened)}
        renderer={() => (
          <Grid items={people} style={{ width: '500px', maxWidth: '100%' }}>
            <GridSelectionColumn />
            <GridColumn header="Name">
              {({ item }) => html`${item.firstName} ${item.lastName}`}
            </GridColumn>
          </Grid>
        )}
        footerRenderer={() => (
          <Button theme="primary" onClick={() => setDialogOpened(false)}>
            Filter
          </Button>
        )}
      />
      {/* end::snippet[] */}
      <Button onClick={() => setDialogOpened(true)}>Show dialog</Button>
    </>
  );
}

export default reactExample(Example);
