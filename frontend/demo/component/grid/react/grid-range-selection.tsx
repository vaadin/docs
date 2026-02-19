import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid, type GridItemToggleEvent } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridSelectionColumn } from '@vaadin/react-components/GridSelectionColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const items = useSignal<Person[]>([]);
  const selectedItems = useSignal<Person[]>([]);
  const rangeStartItem = useRef<Person>(null);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  const handleItemToggle = (event: GridItemToggleEvent<Person>) => {
    const { item, selected, shiftKey } = event.detail;

    // If the anchor point isn't set, set it to the current item
    rangeStartItem.current ??= item;

    if (shiftKey) {
      // Calculcate the range of items between the anchor point and
      // the current item
      const [rangeStart, rangeEnd] = [rangeStartItem.current, item]
        .map((i) => items.value.indexOf(i))
        .sort((a, b) => a - b);
      const rangeItems = items.value.slice(rangeStart, rangeEnd + 1);

      // Update the selection state of items within the range
      // based on the state of the current item
      const newSelectedItems = new Set(selectedItems.value);
      rangeItems.forEach((rangeItem) => {
        if (selected) {
          newSelectedItems.add(rangeItem);
        } else {
          newSelectedItems.delete(rangeItem);
        }
      });
      selectedItems.value = [...newSelectedItems];
    }

    // Update the anchor point to the current item
    rangeStartItem.current = item;
  };

  return (
    <Grid
      items={items.value}
      selectedItems={selectedItems.value}
      onSelectedItemsChanged={(event) => {
        selectedItems.value = event.detail.value;
      }}
      onItemToggle={handleItemToggle}
    >
      <GridSelectionColumn />
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
    </Grid>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
