import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridTreeColumn } from '@hilla/react-components/GridTreeColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  const [managers, setManagers] = useState<Person[]>([]);
  const [expandedItems, setExpandedItems] = useState<unknown[]>([]);

  useEffect(() => {
    getPeople({ count: 10 }).then(({ people }) => setManagers(people));
  }, []);

  const dataProvider = async (_params, callback) => {
    const { people } = await getPeople({
      count: _params.pageSize,
      startIndex: _params.page * _params.pageSize,
      managerId: _params.parentItem ? _params.parentItem.id : null,
    });

    callback({ items: people, size: 1000 });
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
        key="id"
        itemHasChildren={({ item }) => item.manager}
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

export default reactExample(Example);
