import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

function columnRenderer(column: HTMLElement, index: number) {
  return (
    <>
      {column.dataset.index} - {index}
    </>
  );
}

function indexColumnRenderer(index: number) {
  return <>Row {index}</>;
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
    <Grid items={items.value} columnRendering="lazy">
      <GridColumn frozen>{({ model }) => indexColumnRenderer(model.index)}</GridColumn>

      {[...Array(100).keys()].map((index) => (
        // Generate 100 columns
        <GridColumn data-index={index} header={`Col ${index}`}>
          {({ original, model }) => columnRenderer(original, model.index)}
        </GridColumn>
      ))}
    </Grid>
  );
}

export default reactExample(Example); // hidden-source-line
