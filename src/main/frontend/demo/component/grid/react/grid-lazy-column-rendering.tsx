import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function createColumnRenderer(columnIndex: number) {
  return ({ model }: { model: { index: number } }) => (
    <>
      {columnIndex} - {model.index}
    </>
  );
}

function indexColumnRenderer({ model }: { model: { index: number } }) {
  return <>Row {model.index}</>;
}

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
    <Grid items={items.value} columnRendering="lazy">
      <GridColumn frozen renderer={indexColumnRenderer}></GridColumn>

      {[...Array(100).keys()].map((index) => (
        // Generate 100 columns
        <GridColumn key={index} header={`Col ${index}`} renderer={createColumnRenderer(index)} />
      ))}
    </Grid>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
