import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { GridPro } from '@vaadin/react-components/GridPro.js';
import { GridProEditColumn } from '@vaadin/react-components/GridProEditColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

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
    <GridPro items={items.value} enterNextRow>
      <GridProEditColumn path="firstName"></GridProEditColumn>
      <GridProEditColumn path="lastName"></GridProEditColumn>
      <GridProEditColumn path="email"></GridProEditColumn>
      <GridProEditColumn path="profession"></GridProEditColumn>
    </GridPro>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
