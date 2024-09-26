import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Crud } from '@vaadin/react-components-pro/Crud.js';
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

  // tag::snippet[]
  return <Crud include="firstName, lastName, profession" noSort noFilter items={items.value} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
