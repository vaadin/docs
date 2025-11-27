import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useMemo, useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import {
  Grid,
  type GridDataProviderCallback,
  type GridDataProviderParams,
  type GridElement,
} from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridTreeColumn } from '@vaadin/react-components/GridTreeColumn.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { IntegerField } from '@vaadin/react-components/IntegerField.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

type PersonOrId =
  | Person
  | {
      id: number;
    };

function Example() {
  useSignals(); // hidden-source-line
  const gridRef = useRef<GridElement>(null);

  const idToIndexes = useMemo(() => new Map<number, number[]>(), []);

  const expandedItems = useSignal<Person[]>([]);
  const indexesToScrollTo = useSignal<number[]>([13, 6]);

  const indexesToScrollToRef = useRef<number[]>(indexesToScrollTo.value);
  indexesToScrollToRef.current = indexesToScrollTo.value;

  const dataProvider = useMemo(
    () =>
      async (
        params: GridDataProviderParams<PersonOrId>,
        callback: GridDataProviderCallback<PersonOrId>
      ) => {
        const startIndex = params.page * params.pageSize;
        const { people, hierarchyLevelSize } = await getPeople({
          count: params.pageSize,
          startIndex,
          managerId: params.parentItem ? params.parentItem.id : null,
        });

        // Cache the index address of each person for demo purposes
        people.forEach((person, idx) => {
          const index = startIndex + idx;
          const parentIndexes = params.parentItem
            ? (idToIndexes.get(params.parentItem.id) ?? [])
            : [];
          const indexAddress = [...parentIndexes, index];
          idToIndexes.set(person.id, indexAddress);

          if (
            indexAddress[0] === indexesToScrollToRef.current[0] &&
            indexAddress[1] === indexesToScrollToRef.current[1]
          ) {
            indexesToScrollTo.value = indexAddress;
          }
        });

        if (!expandedItems.value.length && !params.parentItem) {
          // Expand the root level by default
          expandedItems.value = people;
        }

        callback(people, hierarchyLevelSize);
      },
    []
  );

  const selectedItems = useComputed(() => {
    const indexAddress = indexesToScrollTo.value.join(', ');
    const id = Array.from(idToIndexes.entries()).find(
      ([, indexes]) => indexes.join(', ') === indexAddress
    )?.[0];
    return id ? [{ id }] : [];
  });

  return (
    <>
      <Grid
        ref={gridRef}
        itemIdPath="id"
        itemHasChildrenPath="manager"
        dataProvider={dataProvider}
        expandedItems={expandedItems.value}
        selectedItems={selectedItems.value}
        onActiveItemChanged={(e) => {
          if (e.detail.value) {
            indexesToScrollTo.value = idToIndexes.get(e.detail.value.id) ?? [];
          }
        }}
      >
        <GridTreeColumn<Person> path="firstName" width="200px" flexGrow={0} />
        <GridColumn<Person> header="Index" width="80px" flexGrow={0}>
          {({ item }) => idToIndexes.get(item.id)?.join(', ')}
        </GridColumn>
        <GridColumn<Person> path="email" />
      </Grid>

      <HorizontalLayout theme="spacing" style={{ alignItems: 'flex-end'}}>
        <IntegerField
          label="Parent index"
          stepButtonsVisible
          min={0}
          style={{ width: '120px' }}
          value={String(indexesToScrollTo.value[0])}
          onChange={(e) => {
            indexesToScrollTo.value = [parseInt(e.target.value) || 0, indexesToScrollTo.value[1]];
          }}
        />

        <IntegerField
          label="Child index"
          stepButtonsVisible
          min={0}
          style={{ width: '120px' }}
          value={String(indexesToScrollTo.value[1])}
          onChange={(e) => {
            indexesToScrollTo.value = [indexesToScrollTo.value[0], parseInt(e.target.value) || 0];
          }}
        />

        <Button
          onClick={() => {
            const grid = gridRef.current;
            if (grid) {
              // tag::snippet[]
              grid.scrollToIndex(...indexesToScrollTo.value);
              // end::snippet[]
            }
          }}
        >
          Scroll to index: {indexesToScrollTo.value.join(', ')}
        </Button>
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
