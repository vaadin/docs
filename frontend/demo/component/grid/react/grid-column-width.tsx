import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridSelectionColumn } from '@hilla/react-components/GridSelectionColumn.js';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
function Example() {
    const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) =>
      setItems(
        people.map((person) => ({
          ...person,
          displayName: `${person.firstName} ${person.lastName}`,
        }))
      )
    );
  }, []);

  return (
    <SplitLayout>
      <Grid items={items} style={{ width: '100%' }}>
        <GridSelectionColumn />
        <GridColumn path="firstName" width="7em" flexGrow={0} />
        <GridColumn path="profession" autoWidth flexGrow={0} />
        <GridColumn path="email" />
        <GridColumn width="6em" flexGrow={0} header="Has Sub">
          {({ item }) => (item.subscriber ? 'Yes' : 'No')}
        </GridColumn>
      </Grid>
      <div></div>
    </SplitLayout>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
