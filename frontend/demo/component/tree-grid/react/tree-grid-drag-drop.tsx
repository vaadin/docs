import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useMemo } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  Grid,
  type GridDataProviderCallback,
  type GridDataProviderParams,
} from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridTreeColumn } from '@vaadin/react-components/GridTreeColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const draggedItem = useSignal<Person | undefined>(undefined);
  const items = useSignal<Person[]>([]);
  const expandedItems = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  const dataProvider = useMemo(
    () => (params: GridDataProviderParams<Person>, callback: GridDataProviderCallback<Person>) => {
      const { page, pageSize, parentItem } = params;
      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;

      /*
    We cannot change the underlying data in this demo so this dataProvider uses
    a local field to fetch its values. This allows us to keep a reference to the
    modified list instead of loading a new list every time the dataProvider gets
    called. In a real application, you should always access your data source
    here and avoid using grid.clearCache() whenever possible.
    */
      const result = parentItem
        ? items.value.filter((item) => item.managerId === parentItem.id)
        : items.value.filter((item) => item.manager).slice(startIndex, endIndex);

      callback(result, result.length);
    },
    [items.value]
  );

  return (
    <Grid
      dataProvider={dataProvider}
      itemIdPath="id"
      itemHasChildrenPath="manager"
      expandedItems={expandedItems.value}
      onExpandedItemsChanged={(event) => {
        expandedItems.value = event.detail.value;
      }}
      rowsDraggable
      dropMode={draggedItem.value ? 'on-top' : undefined}
      onGridDragstart={(event) => {
        draggedItem.value = event.detail.draggedItems[0];
      }}
      onGridDragend={() => {
        draggedItem.value = undefined;
      }}
      onGridDrop={(event) => {
        const manager = event.detail.dropTargetItem;
        if (draggedItem.value) {
          draggedItem.value.managerId = manager.id;
          items.value = [...items.value];
        }
      }}
      dragFilter={(model) => {
        const item = model.item;
        return !item.manager;
      }}
      dropFilter={(model) => {
        const item = model.item;
        return item.manager && item.id !== draggedItem.value?.managerId;
      }}
    >
      <GridTreeColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
