import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import {
  Grid,
  type GridDataProviderCallback,
  type GridDataProviderParams,
} from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridTreeColumn } from '@hilla/react-components/GridTreeColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  const [managers, setManagers] = useState<Person[]>([]);
  const [expandedItems, setExpandedItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople({ count: 10 }).then(({ people }) => setManagers(people));
  }, []);

  const dataProvider = async (
    params: GridDataProviderParams<Person>,
    callback: GridDataProviderCallback<Person>
  ) => {
    const { people, hierarchyLevelSize } = await getPeople({
      count: params.pageSize,
      startIndex: params.page * params.pageSize,
      managerId: params.parentItem ? params.parentItem.id : null,
    });

    if (!params.parentItem) {
      setManagers(people);
    }

    callback(people, hierarchyLevelSize);
  };

  const expandAll = () => {
    setExpandedItems([...managers]);
  };

  const collapseAll = () => {
    setExpandedItems([]);
  };

  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout
        style={{ alignItems: 'center', height: 'var(--lumo-size-xl)' }}
        theme="spacing"
      >
        <h3 style={{ flexGrow: 1, margin: 0 }}>Employee</h3>
        <Button onClick={expandAll}>Expand All</Button>
        <Button onClick={collapseAll}>Collapse All</Button>
      </HorizontalLayout>

      <Grid
        dataProvider={dataProvider}
        itemIdPath="id"
        itemHasChildrenPath="manager"
        expandedItems={expandedItems}
      >
        <GridTreeColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
      </Grid>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
