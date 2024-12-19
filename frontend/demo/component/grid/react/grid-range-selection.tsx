import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridSelectionColumn } from '@vaadin/react-components/GridSelectionColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const startItem = useRef<Person>();
  const selectedItems = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  const handleItemToggle = (event: CustomEvent) => {
    const { item, selected, shiftKey } = event.detail;

    // If the anchor point isn't set, set it to the current item
    startItem.current ??= item;

    if (shiftKey) {
      // Calculcate the range of items between the anchor point and
      // the current item
      const startIndex = items.value.indexOf(startItem.current!);
      const endIndex = items.value.indexOf(item);
      const rangeItems = items.value.slice(
        Math.min(startIndex, endIndex),
        Math.max(startIndex, endIndex) + 1
      );

      // Update the selection state of the items within the range
      // based on the state of the current item
      const selectedItemsCopy = new Set(selectedItems.value);
      rangeItems.forEach((rangeItem) => {
        if (selected) {
          selectedItemsCopy.add(rangeItem);
        } else {
          selectedItemsCopy.delete(rangeItem);
        }
      });
      selectedItems.value = [...selectedItemsCopy];
    }

    // Update the anchor point to the current item
    startItem.current = item;
  };

  return (
    // tag::snippet[]
    <Grid items={items.value} selectedItems={selectedItems.value} onItemToggle={handleItemToggle}>
      <GridSelectionColumn />
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
    </Grid>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
