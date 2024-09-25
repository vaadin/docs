import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    // tag::snippet[]
    <Grid items={items.value} theme="wrap-cell-content">
      <GridColumn header="Image" flexGrow={0} autoWidth>
        {({ item: person }) => (
          <Avatar img={person.pictureUrl} name={`${person.firstName} ${person.lastName}`} />
        )}
      </GridColumn>
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn header="Address">
        {({ item: { address } }) => (
          <span>
            {address.street} {address.city} {address.zip} {address.state}
          </span>
        )}
      </GridColumn>
    </Grid>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
