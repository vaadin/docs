import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { css } from 'lit'; // hidden-source-line
import { AppLayout } from '@vaadin/react-components/AppLayout.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

const h1Style = {
  fontSize: 'var(--lumo-font-size-l)',
  margin: 'var(--lumo-space-m)',
};

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
    <AppLayout style={{ height: '100%' }}>
      <h1 slot="navbar" style={h1Style}>
        MyApp
      </h1>

      <Grid items={items.value} style={{ height: '100%' }} theme="no-border">
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
        <GridColumn path="profession" />
      </Grid>
    </AppLayout>
    // end::snippet[]
  );
}

const hostStyles = css`
  :host {
    height: 100vh;
    margin: calc(-1 * var(--docs-space-l));
  }
`;

export default reactExample(Example, hostStyles); // hidden-source-line
