import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {
  Grid,
  type GridDataProviderCallback,
  type GridDataProviderParams,
} from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridTreeColumn } from '@hilla/react-components/GridTreeColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
async function dataProvider(
  params: GridDataProviderParams<Person>,
  callback: GridDataProviderCallback<Person>
) {
  // The requested page and the full length of the corresponding
  // hierarchy level is requested from the data service
  const { people, hierarchyLevelSize } = await getPeople({
    count: params.pageSize,
    startIndex: params.page * params.pageSize,
    managerId: params.parentItem ? params.parentItem.id : null,
  });

  callback(people, hierarchyLevelSize);
}

function Example() {
  return (
    <Grid itemHasChildrenPath="manager" dataProvider={dataProvider}>
      <GridTreeColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
    </Grid>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
