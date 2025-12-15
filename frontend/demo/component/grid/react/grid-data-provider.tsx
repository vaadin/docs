import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useGridDataProvider } from '@vaadin/hilla-react-crud';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridSortColumn } from '@vaadin/react-components/GridSortColumn.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { GridPersonService } from 'Frontend/generated/endpoints';

// tag::snippet[]
function Example() {
  useSignals(); // hidden-source-line
  const searchTerm = useSignal('');

  // Create a data provider that calls a backend service with a
  // Spring Data pageable and the search term
  const dataProvider = useGridDataProvider(
    async (pageable) => await GridPersonService.list(pageable, searchTerm.value),
    // Providing the search term as a dependency will automatically
    // refresh the data provider when the search term changes
    [searchTerm.value]
  );

  return (
    <VerticalLayout theme="spacing">
      <TextField
        placeholder="Search"
        style={{ width: '50%' }}
        onValueChanged={(e) => {
          searchTerm.value = e.detail.value.trim();
        }}
      >
        <Icon slot="prefix" icon="vaadin:search" />
      </TextField>

      <Grid dataProvider={dataProvider}>
        <GridSortColumn path="fullName" header="Name" />
        <GridSortColumn path="profession" />
      </Grid>
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
