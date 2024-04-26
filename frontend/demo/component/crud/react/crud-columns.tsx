import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Crud } from '@vaadin/react-components/Crud.js';
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
    <>
      {/* tag::snippet[] */}
      {/* Use 'include' or 'exclude' to select which fields to show */}
      <Crud
        items={items.value}
        exclude="lastName, address, id, subscribe, membership, pictureUrl, manager"
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
