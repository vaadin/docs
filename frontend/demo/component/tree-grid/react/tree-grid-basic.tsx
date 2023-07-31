import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridTreeColumn } from '@hilla/react-components/GridTreeColumn.js'; // hidden-source-line
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

async function dataProvider(params) {
  // The requested page and the full length of the corresponding
  // hierarchy level is requested from the data service
  const { people, hierarchyLevelSize } = await getPeople({
    count: params.pageSize,
    startIndex: params.page * params.pageSize,
    managerId: params.parentItem ? params.parentItem.id : null,
  });

  params.successCallback(people, hierarchyLevelSize);
}

function Example() {
  return (
    <Grid
      itemHasChildrenPath="manager" // hidden-source-line
      columnReorderingAllowed // hidden-source-line
      .dataProvider={dataProvider}
    >
      <GridTreeColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
    </Grid>
  );
}

export default reactExample(Example);