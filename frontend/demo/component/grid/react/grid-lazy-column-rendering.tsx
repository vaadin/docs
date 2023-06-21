import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

function columnRenderer(column: HTMLElement, index: number) {
  return `${column.dataset.index} - ${index}`;
}

function indexColumnRenderer(index: number) {
  return `Row ${index}`;
}

function Example() {
  // tag::snippet[]
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <Grid items={items} columnRendering="lazy">
        {/* end::snippet[] */}
        <GridColumn frozen>{({ model }) => indexColumnRenderer(model.index)}</GridColumn>$
        {[...Array(100).keys()].map((index) => (
          // Generate 100 columns
          <GridColumn data-index={index} header={`Col ${index}`}>
            {({ original, model }) => columnRenderer(original, model.index)}
          </GridColumn>
        ))}
      </Grid>
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
