import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

// tag::snippet[]
function Example() {
  return (
    <VerticalLayout>
      <Grid
        emptyText="No data available"
        theme="no-border"
        style={{ width: '100%', height: 'calc(100vh - var(--lumo-space-l))' }}
        items={[
          { id: 1, name: 'John', email: 'john@example.com', profession: 'Developer' },
          { id: 2, name: 'Alice', email: 'alice@example.com', profession: 'Designer' },
        ]}
      >
        <GridColumn width="100px" flex-grow={0}>
          <TextField path="name" label="Name"></TextField>
        </GridColumn>
        <GridColumn flex-grow={1}>
          <TextField path="email" label="Email"></TextField>
        </GridColumn>
        <GridColumn width="100px" flex-grow={0}>
          <HorizontalLayout justify-content="center">
            <Button
              style={{ margin: '0' }}
              icon={<Icon icon="lumo:edit" />}
              theme="tertiary-inline"
              aria-label="Edit"
            ></Button>
            <Button
              style={{ margin: '0' }}
              icon={<Icon icon="lumo:cross" />}
              theme="tertiary-inline"
              aria-label="Delete"
            ></Button>
          </HorizontalLayout>
        </GridColumn>
      </Grid>
    </VerticalLayout>
  );
}
// end::snippet[]

export default reactExample(Example);
