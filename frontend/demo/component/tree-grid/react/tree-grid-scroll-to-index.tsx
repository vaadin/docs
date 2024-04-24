import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useMemo, useRef, useState } from 'react';
import {
  Grid,
  type GridElement,
  type GridDataProviderCallback,
  type GridDataProviderParams,
} from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridTreeColumn } from '@vaadin/react-components/GridTreeColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { IntegerField } from '@vaadin/react-components/IntegerField.js';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

type PersonOrId =
  | Person
  | {
      id: number;
    };

function Example() {
  const gridRef = useRef<GridElement>(null);

  const idToIndexes = useMemo(() => new Map<number, number[]>(), []);

  const [expandedItems, setExpandedItems] = useState<PersonOrId[]>([]);

  const [indexesToScrollTo, setIndexesToScrollTo] = useState<number[]>([13, 6]);
  const indexesToScrollToRef = useRef<number[]>(indexesToScrollTo);
  indexesToScrollToRef.current = indexesToScrollTo;

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
            ? idToIndexes.get(params.parentItem.id) ?? []
            : [];
          const indexAddress = [...parentIndexes, index];
          idToIndexes.set(person.id, indexAddress);

          if (
            indexAddress[0] === indexesToScrollToRef.current[0] &&
            indexAddress[1] === indexesToScrollToRef.current[1]
          ) {
            setIndexesToScrollTo(indexAddress);
          }
        });

        if (!expandedItems.length && !params.parentItem) {
          // Expand the root level by default
          setExpandedItems(people);
        }

        callback(people, hierarchyLevelSize);
      },
    []
  );

  const selectedItems = useMemo(() => {
    const indexAddress = indexesToScrollTo.join(', ');
    const id = Array.from(idToIndexes.entries()).find(
      ([, indexes]) => indexes.join(', ') === indexAddress
    )?.[0];
    return id ? [{ id }] : [];
  }, [indexesToScrollTo]);

  return (
    <>
      <Grid
        ref={gridRef}
        itemIdPath="id"
        itemHasChildrenPath="manager"
        dataProvider={dataProvider}
        expandedItems={expandedItems}
        selectedItems={selectedItems}
        onActiveItemChanged={(e) => {
          if (e.detail.value) {
            setIndexesToScrollTo(idToIndexes.get(e.detail.value.id) ?? []);
          }
        }}
      >
        <GridTreeColumn<Person> path="firstName" width="200px" flexGrow={0} />
        <GridColumn<Person> header="Index" width="80px" flexGrow={0}>
          {({ item }) => idToIndexes.get(item.id)?.join(', ')}
        </GridColumn>
        <GridColumn<Person> path="email" />
      </Grid>

      <HorizontalLayout theme="spacing" className="items-end">
        <IntegerField
          label="Parent index"
          stepButtonsVisible
          min={0}
          style={{ width: '120px' }}
          value={String(indexesToScrollTo[0])}
          onChange={(e) => {
            setIndexesToScrollTo([parseInt(e.target.value) || 0, indexesToScrollTo[1]]);
          }}
        />

        <IntegerField
          label="Child index"
          stepButtonsVisible
          min={0}
          style={{ width: '120px' }}
          value={String(indexesToScrollTo[1])}
          onChange={(e) => {
            setIndexesToScrollTo([indexesToScrollTo[0], parseInt(e.target.value) || 0]);
          }}
        />

        <Button
          onClick={() => {
            const grid = gridRef.current;
            if (grid) {
              // tag::snippet[]
              grid.scrollToIndex(...indexesToScrollTo);
              // end::snippet[]
            }
          }}
        >
          Scroll to index: {indexesToScrollTo.join(', ')}
        </Button>
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
