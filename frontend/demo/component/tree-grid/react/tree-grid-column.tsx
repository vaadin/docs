import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useMemo } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import {
  Grid,
  type GridDataProviderCallback,
  type GridDataProviderParams,
} from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridTreeColumn } from '@vaadin/react-components/GridTreeColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Button } from '@vaadin/react-components/Button.js';

function Example() {
  useSignals(); // hidden-source-line
  const managers = useSignal<Person[]>([]);
  const expandedItems = useSignal<Person[]>([]);

  const dataProvider = useMemo(
    () =>
      async (
        params: GridDataProviderParams<Person>,
        callback: GridDataProviderCallback<Person>
      ) => {
        const { people, hierarchyLevelSize } = await getPeople({
          count: params.pageSize,
          startIndex: params.page * params.pageSize,
          managerId: params.parentItem ? params.parentItem.id : null,
        });

        if (!managers.value.length && !params.parentItem) {
          managers.value = people;
        }

        callback(people, hierarchyLevelSize);
      },
    []
  );

  const expandAll = () => {
    expandedItems.value = [...managers.value];
  };

  const collapseAll = () => {
    expandedItems.value = [];
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
        expandedItems={expandedItems.value}
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
