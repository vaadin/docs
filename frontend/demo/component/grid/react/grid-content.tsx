import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridSelectionColumn } from '@vaadin/react-components/GridSelectionColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

// tag::snippet[]
const employeeRenderer = (person: Person) => (
  <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing">
    <Avatar img={person.pictureUrl} name={`${person.firstName} ${person.lastName}`} />

    <VerticalLayout style={{ lineHeight: 'var(--lumo-line-height-m)' }}>
      <span>
        {person.firstName} {person.lastName}
      </span>
      <span
        style={{ fontSize: 'var(--lumo-font-size-s)', color: 'var(--lumo-secondary-text-color)' }}
      >
        {person.email}
      </span>
    </VerticalLayout>
  </HorizontalLayout>
);

const statusRenderer = (person: Person) => (
  <span {...{ theme: `badge ${person.status === 'Available' ? 'success' : 'error'}` }}>
    {person.status}
  </span>
);

function Example() {
  const gridRef = React.useRef<any>(null);
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));

    // Workaround for https://github.com/vaadin/react-components/issues/129
    setTimeout(() => {
      gridRef.current?.recalculateColumnWidths();
    }, 100);
  }, []);

  return (
    <Grid items={items} ref={gridRef}>
      <GridSelectionColumn />

      <GridColumn header="Employee" flexGrow={0} autoWidth>
        {({ item }) => employeeRenderer(item)}
      </GridColumn>

      <GridColumn path="profession" autoWidth />

      <GridColumn header="Status" autoWidth>
        {({ item }) => statusRenderer(item)}
      </GridColumn>
    </Grid>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
