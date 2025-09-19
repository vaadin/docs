import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { GridPro } from '@vaadin/react-components-pro/GridPro.js';
import { GridProEditColumn } from '@vaadin/react-components-pro/GridProEditColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
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
    <GridPro theme="highlight-read-only-cells" items={items.value}>
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="membership" />
      <GridProEditColumn path="email" header="Email (Editable)" />
    </GridPro>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
