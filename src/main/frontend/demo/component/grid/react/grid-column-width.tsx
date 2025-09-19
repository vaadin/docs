import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridSelectionColumn } from '@vaadin/react-components/GridSelectionColumn.js';
import { SplitLayout } from '@vaadin/react-components/SplitLayout.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function subscriberRenderer({ item }: { item: Person }) {
  return item.subscriber ? 'Yes' : 'No';
}

// tag::snippet[]
function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    <SplitLayout>
      <Grid items={items.value} style={{ width: '100%' }}>
        <GridSelectionColumn />
        <GridColumn path="firstName" width="7rem" flexGrow={0} />
        <GridColumn path="profession" autoWidth flexGrow={0} />
        <GridColumn path="email" />
        <GridColumn width="6rem" flexGrow={0} header="Has Sub" renderer={subscriberRenderer} />
      </Grid>
      <div></div>
    </SplitLayout>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
