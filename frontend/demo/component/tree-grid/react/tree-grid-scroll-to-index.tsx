import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import {
  Grid,
  type GridDataProviderCallback,
  type GridDataProviderParams,
} from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridTreeColumn } from '@vaadin/react-components/GridTreeColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

type PersonWithIndexes = Person & {
  indexes: number[];
};

// tag::snippet[]

function Example() {
  const [expandedItems, setExpandedItems] = useState<PersonWithIndexes[]>([]);

  async function dataProvider(
    params: GridDataProviderParams<PersonWithIndexes>,
    callback: GridDataProviderCallback<PersonWithIndexes>
  ) {
    const startIndex = params.page * params.pageSize;
    const { people, hierarchyLevelSize } = await getPeople({
      count: params.pageSize,
      startIndex,
      managerId: params.parentItem ? params.parentItem.id : null,
    });

    const peopleWithIndexes = people.map((person, idx) => {
      const index = startIndex + idx;
      return {
        ...person,
        indexes: params.parentItem ? [...params.parentItem.indexes, index] : [index],
      };
    });

    if (!expandedItems && !params.parentItem) {
      setExpandedItems(peopleWithIndexes);
    }

    callback(peopleWithIndexes, hierarchyLevelSize);
  }

  return (
    <Grid itemIdPath="id" itemHasChildrenPath="manager" dataProvider={dataProvider}>
      <GridTreeColumn path="firstName" />
      <GridColumn header="Index"></GridColumn>
      <GridColumn path="email" />
    </Grid>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
