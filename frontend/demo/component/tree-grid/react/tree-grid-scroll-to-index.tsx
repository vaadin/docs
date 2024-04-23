import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useMemo, useRef, useState } from 'react';
import {
  Grid,
  GridElement,
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

// tag::snippet[]

function Example() {
  const gridRef = useRef<GridElement>(null);

  const [expandedItems, setExpandedItems] = useState<PersonOrId[]>([]);

  const [indexesToScrollTo, setIndexesToScrollTo] = useState<number[]>([13, 6]);

  const [idToIndexes, setIdToIndexes] = useState<Map<number, number[]>>(new Map());

  const dataProvider = useMemo(
    () =>
      async function dataProvider(
        params: GridDataProviderParams<PersonOrId>,
        callback: GridDataProviderCallback<PersonOrId>
      ) {
        const startIndex = params.page * params.pageSize;
        const { people, hierarchyLevelSize } = await getPeople({
          count: params.pageSize,
          startIndex,
          managerId: params.parentItem ? params.parentItem.id : null,
        });

        people.forEach((person, idx) => {
          const index = startIndex + idx;
          const parentIndexes = params.parentItem
            ? idToIndexes.get(params.parentItem.id) || []
            : [];
          const indexAddress = [...parentIndexes, index];
          idToIndexes.set(person.id, indexAddress);
          setIdToIndexes(idToIndexes);
        });

        if (!expandedItems.length && !params.parentItem) {
          // Expand the root level by default
          setExpandedItems(people);
        }

        callback(people, hierarchyLevelSize);
      },
    [idToIndexes]
  );

  const selectedItems = useMemo(() => {
    const indexAddress = indexesToScrollTo.join(', ');
    const id = Array.from(idToIndexes.entries()).find(
      ([, indexes]) => indexes.join(', ') === indexAddress
    )?.[0];
    return id ? [{ id }] : [];
  }, [indexesToScrollTo, idToIndexes]);

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
            setIndexesToScrollTo(idToIndexes.get(e.detail.value.id) || []);
          }
        }}
      >
        <GridTreeColumn path="firstName" width="200px" flexGrow={0} />
        <GridColumn header="Index" width="80px" flexGrow={0}>
          {({ item }) => idToIndexes.get(item.id)?.join(', ')}
        </GridColumn>
        <GridColumn path="email" />
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
            gridRef.current?.scrollToIndex(...indexesToScrollTo);
          }}
        >
          Scroll to index: {indexesToScrollTo.join(', ')}
        </Button>
      </HorizontalLayout>
    </>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
