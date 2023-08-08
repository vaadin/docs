import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import {
  Grid,
  type GridDataProviderCallback,
  type GridDataProviderParams,
} from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridTreeColumn } from '@hilla/react-components/GridTreeColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  // tag::snippet[]
  const [draggedItem, setDraggedItem] = useState<Person>();
  const [items, setItems] = useState<Person[]>([]);
  const [expandedItems, setExpandedItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  const dataProvider = (
    params: GridDataProviderParams<Person>,
    callback: GridDataProviderCallback<Person>
  ) => {
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
      ? items.filter((item) => item.managerId === parentItem.id)
      : items.filter((item) => item.manager).slice(startIndex, endIndex);

    callback(result, result.length);
  };

  return (
    <Grid
      dataProvider={dataProvider}
      itemIdPath="id"
      itemHasChildrenPath="manager"
      expandedItems={expandedItems}
      onExpandedItemsChanged={(event) => {
        setExpandedItems(event.detail.value);
      }}
      rowsDraggable
      dropMode="on-top"
      onGridDragstart={(event) => {
        setDraggedItem(event.detail.draggedItems[0]);
      }}
      onGridDragend={() => {
        setDraggedItem(undefined);
      }}
      onGridDrop={(event) => {
        const manager = event.detail.dropTargetItem;
        if (draggedItem) {
          draggedItem.managerId = manager.id;
          setItems([...items]);
        }
      }}
      dragFilter={(model) => {
        const item = model.item;
        return !item.manager;
      }}
      dropFilter={(model) => {
        const item = model.item;
        return item.manager && item.id !== draggedItem?.managerId;
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
